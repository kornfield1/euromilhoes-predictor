// JavaScript principal para o Previsor Euromilhões

$(document).ready(function() {
    // Inicialização de tooltips e popovers do Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    });

    // Manipulador para o botão de geração de previsão na página inicial
    $('#btn-gerar-previsao').click(function() {
        $('html, body').animate({
            scrollTop: $('#form-previsao').offset().top - 100
        }, 800);
    });

    // Manipulador para o formulário de previsão
    $('#form-previsao').submit(function(e) {
        e.preventDefault();
        
        // Mostrar indicador de carregamento
        $('#loading').removeClass('d-none');
        $('#resultados-previsao').empty();
        
        // Obter valores do formulário
        var metodo = $('#metodo').val();
        var numPrevisoes = $('#num_previsoes').val();
        
        // Enviar pedido AJAX
        $.ajax({
            url: '/gerar_previsao',
            type: 'POST',
            data: {
                metodo: metodo,
                num_previsoes: numPrevisoes
            },
            success: function(response) {
                // Esconder indicador de carregamento
                $('#loading').addClass('d-none');
                
                if (response.status === 'success') {
                    // Mostrar resultados
                    mostrarPrevisoes(response.previsoes, metodo);
                } else {
                    // Mostrar erro
                    $('#resultados-previsao').html(
                        '<div class="alert alert-danger" role="alert">' +
                        '<i class="fas fa-exclamation-triangle me-2"></i>' +
                        'Erro ao gerar previsões: ' + response.mensagem +
                        '</div>'
                    );
                }
            },
            error: function() {
                // Esconder indicador de carregamento e mostrar erro
                $('#loading').addClass('d-none');
                $('#resultados-previsao').html(
                    '<div class="alert alert-danger" role="alert">' +
                    '<i class="fas fa-exclamation-triangle me-2"></i>' +
                    'Erro ao comunicar com o servidor. Por favor, tente novamente.' +
                    '</div>'
                );
            }
        });
    });

    // Função para mostrar previsões geradas
    function mostrarPrevisoes(previsoes, metodo) {
        var container = $('#resultados-previsao');
        var titulo = '';
        var icone = '';
        var corClasse = '';
        
        // Definir título e ícone com base no método
        if (metodo === 'frequencia') {
            titulo = 'Previsões Baseadas em Frequência';
            icone = 'chart-line';
            corClasse = 'primary';
        } else if (metodo === 'recencia') {
            titulo = 'Previsões Baseadas em Recência';
            icone = 'history';
            corClasse = 'success';
        } else {
            titulo = 'Previsões Híbridas';
            icone = 'star';
            corClasse = 'warning';
        }
        
        // Adicionar título
        container.append(
            '<h3 class="text-center mb-4">' +
            '<i class="fas fa-' + icone + ' me-2 text-' + corClasse + '"></i>' +
            titulo +
            '</h3>'
        );
        
        // Adicionar linha para os cards
        var row = $('<div class="row g-4"></div>');
        container.append(row);
        
        // Adicionar um card para cada previsão
        $.each(previsoes, function(index, previsao) {
            var card = $(
                '<div class="col-md-6 col-lg-4">' +
                '  <div class="card h-100 shadow-sm">' +
                '    <div class="card-header bg-' + corClasse + (corClasse === 'warning' ? ' text-dark' : ' text-white') + '">' +
                '      <h5 class="mb-0">Previsão ' + (index + 1) + '</h5>' +
                '    </div>' +
                '    <div class="card-body">' +
                '      <div class="numeros-container mb-3">' +
                '        <div class="numeros-euromilhoes">' +
                '          <!-- Números serão inseridos aqui -->' +
                '        </div>' +
                '        <div class="estrelas-euromilhoes">' +
                '          <!-- Estrelas serão inseridas aqui -->' +
                '        </div>' +
                '      </div>' +
                '      <p class="card-text text-muted">' +
                '        <small>Gerado em: ' + previsao.data_previsao + '</small>' +
                '      </p>' +
                '    </div>' +
                '  </div>' +
                '</div>'
            );
            
            // Adicionar números
            var numerosContainer = card.find('.numeros-euromilhoes');
            $.each(previsao.numeros, function(i, numero) {
                numerosContainer.append('<span class="numero">' + numero + '</span>');
            });
            
            // Adicionar estrelas
            var estrelasContainer = card.find('.estrelas-euromilhoes');
            $.each(previsao.estrelas, function(i, estrela) {
                estrelasContainer.append('<span class="estrela">' + estrela + '</span>');
            });
            
            // Adicionar card à linha
            row.append(card);
        });
        
        // Adicionar nota explicativa
        container.append(
            '<div class="alert alert-info mt-4" role="alert">' +
            '  <i class="fas fa-info-circle me-2"></i>' +
            '  <strong>Nota:</strong> Estas previsões são baseadas em análise estatística e não garantem resultados. ' +
            '  O Euromilhões é um jogo de sorte onde cada sorteio é independente dos anteriores.' +
            '</div>'
        );
        
        // Scroll suave até aos resultados
        $('html, body').animate({
            scrollTop: container.offset().top - 100
        }, 800);
    }

    // Converter markdown para HTML nos relatórios, se necessário
    if ($('.markdown-body').length > 0) {
        $('.markdown-body').each(function() {
            var content = $(this).html();
            if (typeof marked !== 'undefined') {
                $(this).html(marked.parse(content));
            }
        });
    }
});

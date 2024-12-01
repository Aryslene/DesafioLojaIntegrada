
beforeEach(() => {

    //acessando a página
    cy.visit("https://qastoredesafio.lojaintegrada.com.br/")
});

describe('Cupons', () => {

    //caso de teste 001
    it('001 - Cadastrar um cupom FRETEGRATIS', () => {
        
        //função para adicionar um produto no carrinho
        adicionarProdutoCarrinho()

        //função para adicionar um cupom
        adicionarCupom("FRETEGRATIS")

        //verifica se o frete zerou
        cy.get(':nth-child(2) > .radio').then(($radios) => {
            expect($radios).to.contain('1 dia útil R$ 0,00 Frete Grátis');
        });

        //verifica mensagem na tela
        cy.get('.cupom-valor').then(($valor) => {
            expect($valor).to.contain('Frete Grátis');
        });

        //verifica mensagem na tela
        cy.get('.muted').then(($promocao) => {
            expect($promocao).to.contain('Alguns cupons não são cumulativos com promoções');
        });
        
        //verifica se valor do subtotal é igual ao total
        cy.get('.total > .titulo').then(function($elem) {
            cy.get('.subtotal > .titulo').contains($elem.text()) 
        }) 
    
        //print da tela
        cy.screenshot('001 - cupom FRETEGRATIS')
    });

   it('007 - Excluir um Cupom FRETEGRATIS', () => {
        adicionarProdutoCarrinho()
        adicionarCupom("FRETEGRATIS")
        
        //clica no simbolo de excluir
        cy.get('.text-error').click()

        //verifica se o frete retornou o valor
        cy.get(':nth-child(2) > .radio').then(($radios) => {
            expect($radios).to.contain('1 dia útil R$ 51,40 SEDEX');
        });

        //print da tela
        cy.screenshot('007 - excluir cupom FRETEGRATIS')
    });
});

function adicionarProdutoCarrinho (){
    cy.get('[href="https://qastoredesafio.lojaintegrada.com.br/produtooolalal"] > .titulo').click()
    cy.get(':nth-child(1) > .listagem-item > .info-produto > .nome-produto').click()
    cy.get('.comprar > .botao').click()
//  cy.contains('button', 'Comprar').click()
}

function adicionarCupom(nomeCupom){
    cy.get('#calcularFrete').type('41365-180')
    cy.contains('button', 'Calcular').click()
    cy.get('#usarCupom').type(nomeCupom)
    cy.get('#btn-cupom').click()
}


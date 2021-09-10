/// <reference types="cypress" />

const faker = require('faker')
faker.locale = "pt_BR";

describe('Soul test Trip API', ()=>{
        

    let tokenAdmin ='';
    let tokenUser= '';
    let acompanhante = faker.name.findName();
    let localDeDestino = faker.address.city();
    //console.log(localDeDestino);
    let someId = '36';
    let myUrl = 'http://localhost:8089/api/v1/viagens/'
    
    before(()=>{
        cy.request({
            method: 'POST',
            url: 'http://localhost:8089/api/v1/auth',
            body: {
                email:"admin@email.com" ,
                senha:"654321"
            }

        }).then(res=>{
            tokenAdmin = res.body.data.token;

        })

        cy.request({
            method: 'POST',
            url: 'http://localhost:8089/api/v1/auth',
            body: {
                email:"usuario@email.com" ,
                senha:"123456"
            }

        }).then(res=>{ 
            tokenUser = res.body.data.token;
  
        })

    })

    beforeEach(()=>{

    })

    it.skip('Shoul book a Trip',()=> {
       
        cy.request({
            method: 'POST',
            url: 'http://localhost:8089/api/v1/viagens',
            //headers: {Authorization: `bearer ${tokenAdmin}`},
            headers:{Authorization: tokenAdmin},
            body: {
                acompanhante: acompanhante,
                dataPartida: "2021-09-15",
                dataRetorno: "2021-09-30",
                localDeDestino: localDeDestino,
                regiao: "Norte"
            }

        }).as('response')
        cy.get('@response').then(res=>{
            expect(res.status).to.be.equal(201);
            expect(res.body.data).to.have.property('id');
            expect(res.body.data).to.have.property('acompanhante').to.be.equal(acompanhante);
            expect(res.body.data).to.have.property('dataPartida').to.be.equal("2021-09-15");
            expect(res.body.data).to.have.property('dataRetorno').to.be.equal("2021-09-30");
            expect(res.body.data).to.have.property('localDeDestino').to.be.equal(localDeDestino);
            expect(res.body.data).to.have.property('regiao').to.be.equal("Norte");            
        })    
    })

    it.skip('Shoul return all trips booked',()=> {
       
        cy.request({
            method: 'GET',
            url: 'http://localhost:8089/api/v1/viagens',
            headers:{Authorization: tokenUser},
            
        }).as('response')
        cy.get('@response').then(res=>{
            expect(res.status).to.be.equal(200);
            expect(res.body).not.to.null;
            console.log(res.body)  
        })
              
    })

    it.skip('Shoul delete a trip',()=> {
       
          
        myUrl = myUrl + someId;
        console.log(myUrl)
        
        cy.request({
            method: 'DELETE',
            url: myUrl,
            headers:{Authorization: tokenAdmin}   
        })    
    })


})


function getSomeId(token){
    /* let someId='';
    cy.request({
        method: 'GET',
        url: 'http://localhost:8089/api/v1/viagens',
        headers:{Authorization: token}
        
    }).its('res.body.data.id').should('not.be.empty')
        .then(res.body.data.id =>{
        return id
    }) */
    
}








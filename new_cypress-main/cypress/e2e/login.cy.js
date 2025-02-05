
import * as data from "../helpers/default1_data.json"


describe('Проверка авторизации', function () {

   
    beforeEach('Начало теста', function () {
        cy.visit('https://login.qa.studio/');
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');
          });
    
    afterEach('Конец теста', function () {
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
           });

    it('Верный логин и верный пароль', function () {
         
         cy.get('#mail').type(data.login);
         cy.get('#pass').type(data.password);
         cy.get('#loginButton').click();
         cy.get('#messageHeader').contains('Авторизация прошла успешно');
         cy.get('#messageHeader').should('be.visible');
                 
     })

     it('Верный логин и НЕверный пароль', function () {
       
        cy.get('#mail').type(data.login);
        cy.get('#pass').type('iveryLoveqastudio1');
        cy.get('#loginButton').click();
        cy.get('#messageHeader').contains('Такого логина или пароля');
        cy.get('#messageHeader').should('be.visible');
               
    })
    it('НЕверный логин и верный пароль', function () {
       
        cy.get('#mail').type('germ@dolnikov.ru');
        cy.get('#pass').type(data.password);
        cy.get('#loginButton').click();
        cy.get('#messageHeader').contains('Такого логина или пароля');
        cy.get('#messageHeader').should('be.visible');
             
    })

    it('Проверка, что в логине есть @', function () {
       
        cy.get('#mail').type('germandolnikov.ru');
        cy.get('#pass').type(data.password);
        cy.get('#loginButton').click();
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации');
        cy.get('#messageHeader').should('be.visible');
             
    })

    it('Проверка восстановления пароля', function () {
       
        cy.get('#forgotEmailButton').click();
        cy.get('#forgotForm > .header').contains('Восстановите пароль');
        cy.get('#mailForgot').type(data.login);
        cy.get('#restoreEmailButton').click();
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');
        cy.get('#messageHeader').should('be.visible');
              
    })

    
    it('Приведение к строчным буквам в логине', function () {
     
        // Вводим логин с заглавными буквами
        cy.get('#mail').type('GerMan@Dolnikov.ru');
        
    
        // Получаем значение поля логина до отправки формы
        cy.get('#mail') .invoke('val').then((initialValue) => {
     
        // Сохраняем исходное значение для дальнейшего сравнения
        cy.wrap(initialValue).as('initialLogin');
          });
     
        // Вводим пароль
        cy.get('#pass').type(data.password);
     
        // Отправляем форму
        cy.get('#loginButton').click();
     
        // Получаем значение поля логина после отправки формы
        cy.get('#mail').invoke('val').then((finalValue) => {
     
            // Убеждаемся, что значение было приведено к нижнему регистру
              expect(finalValue.toLowerCase()).to.eq(finalValue);
              
              // Сравниваем с первоначальным значением
              cy.get('@initialLogin').then((initialLogin) => {
                  expect(finalValue).not.to.eq(initialLogin);
              });
          });
        
        // Проверяем успешную авторизацию
        cy.get('#messageHeader').contains('Авторизация прошла успешно');
        cy.get('#messageHeader').should('be.visible');
    });
    
        
 }) 

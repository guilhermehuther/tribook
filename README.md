# Tribook

Rede social para o [Trilha](https://www.trilhaufpb.com).

## Diagramas

### Diagrama de Caso de Uso

![caso_de_uso](./docs/image.png)

### Diagrama de Classes

![diagrama_de_classes](https://github.com/guilhermehuther/tribook/blob/main/docs/diagrama%20final%20att.drawio.png)

# Documentação dos padrões de projeto utilizados

Este documento apresenta os padrões de projeto utilizados no sistema, detalhando as classes envolvidas e o objetivo de uso de cada padrão.

## 1. Facade

**Classes envolvidas:**  
- `TribookFacade`  
- `ControladorUsuario`  
- `ControladorPostagem`

**Objetivo de uso:**  
O padrão **Facade** simplifica o acesso às funcionalidades principais do sistema. A classe `TribookFacade` centraliza as chamadas dos controladores de usuários e postagens, expondo métodos que facilitam a comunicação entre a camada de visão (View) e a camada de negócios (Business). Isso reduz o acoplamento e torna o sistema mais fácil de usar, escondendo a complexidade de múltiplos controladores.

---

## 2. Strategy

**Classes envolvidas:**  
- `AuthContext`  
- `AuthStrategy` (interface)  
- `PasswordAuth`  
- `TokenAuth`

**Objetivo de uso:**  
O padrão **Strategy** permite que o sistema suporte múltiplos mecanismos de autenticação. A classe `AuthContext` utiliza uma estratégia de autenticação que pode ser `PasswordAuth` (autenticação por senha) ou `TokenAuth` (autenticação por token). Isso permite alternar o método de autenticação de forma flexível, sem modificar o código que consome o serviço de autenticação.

---

## 3. Factory Method

**Classes envolvidas:**  
- `ControladorUsuario`  
- `ControladorPostagem`  
- `ControladorComentario`

**Objetivo de uso:**  
O padrão **Factory Method** encapsula a criação dos objetos de controle no sistema. Ele garante que a criação de controladores como `ControladorUsuario`, `ControladorPostagem` e `ControladorComentario` ocorra de maneira controlada e padronizada. Isso facilita a manutenção e permite modificações futuras sem impacto em outras partes do sistema.

---

## 4. Singleton

**Classes envolvidas:**  
- `DataBase`

**Objetivo de uso:**  
O padrão **Singleton** assegura que exista apenas uma instância da classe `DataBase` durante toda a execução do sistema. Isso controla o acesso compartilhado ao recurso de conexão com o banco de dados e evita múltiplas conexões desnecessárias. O método `getInstance()` garante que a instância única seja utilizada por todo o sistema.

---

## 5. Component-based (Arquitetura baseada em componentes)

**Classes envolvidas:**  
- `TelaUsuario`  
- `TelaPostagem`  
- `TelaComentario`  
- `TelaInteracao`

**Objetivo de uso:**  
A arquitetura **Component-based** foi utilizada na camada de visualização (View). Cada tela (`TelaUsuario`, `TelaPostagem`, etc.) funciona como um componente independente, responsável por interagir com o usuário e exibir informações específicas. Essa abordagem modulariza a interface gráfica, facilitando a manutenção e a reutilização de componentes da interface.

---

## Resumo dos Padrões de Projeto

| **Padrão**        | **Classes**                                                                 | **Objetivo**                                   |
|-------------------|-----------------------------------------------------------------------------|-----------------------------------------------|
| **Facade**        | TribookFacade, ControladorUsuario, ControladorPostagem                      | Unificar e simplificar o acesso às regras de negócio |
| **Strategy**      | AuthContext, AuthStrategy, PasswordAuth, TokenAuth                           | Flexibilizar e alternar formas de autenticação |
| **Factory Method**| ControladorUsuario, ControladorPostagem, ControladorComentario               | Encapsular a criação de objetos de controle   |
| **Singleton**     | DataBase                                                                      | Garantir uma única conexão com o banco de dados |
| **Component-based** | TelaUsuario, TelaPostagem, TelaComentario, TelaInteracao                   | Modularizar e organizar a interface gráfica   |

---

## Padrões

### Adapter

A escolha dos [models](/src/model/model.py) utiliza-se do padrão **Adapter**. Os models recebem parâmetros dos usuários, via API, e transforma esses em uma interface reconhecida pela biblioteca [SQLModel](https://sqlmodel.tiangolo.com/).

### Factory

Tendo em vista, a necessidade de geração de endpoints semelhantes, porém, com vriáveis criamos o [CRUDRouteFactory](./src/route/factory.py#L16).

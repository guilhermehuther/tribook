# Tribook

Rede social para o [Trilha](https://www.trilhaufpb.com).

## Diagramas

### Diagrama de Caso de Uso

![caso_de_uso](./docs/image.png)

### Diagrama de Classes

![diagrama_de_classes](https://github.com/guilhermehuther/tribook/blob/main/docs/Diagrama%20de%20classes%20atualizado.drawio%20(1).png)

## Padrões

### Adapter

A escolha dos [models](/src/model/model.py) utiliza-se do padrão **Adapter**. Os models recebem parâmetros dos usuários, via API, e transforma esses em uma interface reconhecida pela biblioteca [SQLModel](https://sqlmodel.tiangolo.com/).
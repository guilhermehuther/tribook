# Tribook

Rede social para o [Trilha](https://www.trilhaufpb.com).

## Diagramas

### Diagrama de Caso de Uso

![caso_de_uso](./docs/image.png)

### Diagrama de Classes

![diagrama_de_classes]((https://github.com/guilhermehuther/tribook/blob/main/docs/diagrama%20final%20att.drawio.png?raw=true))

## Padrões

### Adapter

A escolha dos [models](/src/model/model.py) utiliza-se do padrão **Adapter**. Os models recebem parâmetros dos usuários, via API, e transforma esses em uma interface reconhecida pela biblioteca [SQLModel](https://sqlmodel.tiangolo.com/).

### Factory

Tendo em vista, a necessidade de geração de endpoints semelhantes, porém, com vriáveis criamos o [CRUDRouteFactory](./src/route/factory.py#L16).

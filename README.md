# 개요
graphql 공부한거 간단하게 사용법 정도만 익혀본거

# 구조
게시판을 표현하기 위한 스키마 구조로 만들었음

```javascript

type Board {
    id: ID!
    title: String
    content: String
    created_at: Date
    updated_at: Date
}

getBoard(id: ID!): Board                        // GET
createBoard(input: BoardInput): Board           // CREATE
updateBoard(id: ID!, input: BoardInput): Board  // UPDATE

```
const express = require('express');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

const moment = require('moment');
const app = express();

const schema = buildSchema(`
    scalar Date

    type Board {
        id: ID!
        title: String
        content: String
        created_at: Date
        updated_at: Date
    }

    type Query {
        getBoard(id: ID!): Board
    }

    input BoardInput {
        title: String
        content: String
    }

    type Mutation {
        createBoard(input: BoardInput): Board
        updateBoard(id: ID!, input: BoardInput): Board
    }
`);

class Board {
    constructor(id, { title, content }) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.created_at = moment().format();
        this.updated_at = moment().format();
    }
}

const boards = [
    {},
    {
        id: 1,
        title: '제목1',
        content: '내용1',
        created_at: moment().format(),
        updated_at: moment().format()
    },
    {
        id: 2,
        title: '제목2',
        content: '내용2',
        created_at: moment().format(),
        updated_at: moment().format()
    }
];

const root = {
    getBoard: ({ id }) => {
        return boards[id];
    },
    createBoard: ({ input }) => {
        var id = parseInt(boards.length);
        boards[id] = new Board(id, input);
        return boards[id]
    },
    updateBoard: ({ id, input }) => {
        if (!boards[id]) throw new Error('no board exists with id ' + id);
        boards[id].title = input.title;
        boards[id].content = input.content;
        boards[id].updated_at = moment().format()
        return boards[id];
    }
};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(3000, () => {
    console.log('running server');
});
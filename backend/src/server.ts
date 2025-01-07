import * as fastify from 'fastify';
import Fastify from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http'
import cors from '@fastify/cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = Fastify();

// Supabase client setup
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

app.register(cors, { origin: '*'});

// Get all todos
app.get('/todos', async (request, reply) => {
    const { data, error } = await supabase.from('todo').select('*');
    if (error) return reply.status(500).send({error: error.message});
    return data;
})

const todoBodyJsonSchema = {
    type: 'object',
    required: ['title'],
    properties: {
        title: {type: 'string'},
    }
}

const schema = {
    body: todoBodyJsonSchema,
}

// Add todo
app.post('/createTodo', { schema }, async (request: any, reply) => {
    const {data, error} = await supabase.from('todo').insert({title: request.body.title}).select()
    if (error) return reply.status(500).send({error: error.message});
    return data;
})

// Start server
const start = async () => {
    try {
        await app.listen({ port: 5000});
        console.log('Server running on http://localhost:5000');
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
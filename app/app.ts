import { promises as fs } from 'fs';

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { v4 } from 'uuid';

import * as notas from '../notas.json';
import { Note } from '../note';

const app: Application = express();

const port: Number = 5000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.post('/', async (req: Request, res: Response) => {

    const newNote = req.body;
    const datos: Array<Note> = notas.data;

    while (true) {
        let uuid = v4();
        const bo: boolean = datos.some(data => data.id === uuid);
        if (!bo || datos.length === 0) {
            datos.push({
                id: v4(),
                title: newNote.title,
                state: newNote.state,
                description: newNote.state
            });
            break;
        }
    }

    const d = JSON.stringify({
        data: datos
    });
    
    await fs.writeFile('notas.json', d);

    res.json(datos);
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
import {Router, Request, Response} from 'express';

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
    res.json ({
        ok: true,
        message: 'All is ok'
    })
});
router.post('/mensajes', (req: Request, res: Response) => {
    const cuerpo  = req.body.cuerpo;
    const de  = req.body.de;
    res.json({
        ok: true,
        cuerpo: cuerpo,
        de: de
    })
});
router.post('/mensajes/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const cuerpo  = req.body.cuerpo;
    const de  = req.body.de;
    res.json({
        ok: true,
        cuerpo: cuerpo,
        de: de,
        id
    })
});
export default router;
import { Request, Response } from 'express'
import { getRepository } from 'typeorm';
import orphanageView from '../views/orphanages_view';

import Orphanage from '../models/Orphanage';
import orphanages_view from '../views/orphanages_view';

import * as Yup from 'yup';

export default {
    async index(req: Request, res: Response) {
        const orphanagesrepository = getRepository(Orphanage);

        const orphanages = await orphanagesrepository.find({
            relations: ['images']
        });

        return res.json(orphanages_view.renderMany(orphanages));
    },

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images'],
        });

        return res.json(orphanageView.render(orphanage));
    },

    async create(req: Request, res: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const requestImages = req.files as Express.Multer.File[];
    
        const images = requestImages.map((image) => {
          return { path: image.filename };
        });
    
        const schema = Yup.object().shape({
          name: Yup.string().required(),
          latitude: Yup.number().required(),
          longitude: Yup.number().required(),
          about: Yup.string().required().max(300),
          instructions: Yup.string().required(),
          opening_hours: Yup.string().required(),
          open_on_weekends: Yup.boolean().required(),
          images: Yup.array(
            Yup.object().shape({
              path: Yup.string().required(),
            })
          ),
        });
    
        let { open_on_weekends } = req.body;
        open_on_weekends = open_on_weekends.toLowerCase() === 'true';
    
        await schema.validate(
          { ...req.body, open_on_weekends, images },
          { abortEarly: false }
        );
    
        const orphanage = orphanagesRepository.create({
          ...req.body,
          open_on_weekends,
          images,
        });
    
        await orphanagesRepository.save(orphanage);
    
        return res.status(201).json(orphanage);
    }
}
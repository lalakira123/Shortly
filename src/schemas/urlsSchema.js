import joi from 'joi';

const urlSchema = joi.object({
    url: joi.string().uri().trim().required()
})

export default urlSchema;
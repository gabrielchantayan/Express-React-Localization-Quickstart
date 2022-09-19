import asyncWrapper from '../../middleware/asyncWrapper.js'
import getLocaleFile from '../../utils/locale/getLocaleFile.js'


const getLocale = asyncWrapper(async (req, res) => {

    const localeFile = await getLocaleFile(req.locale);

    res.status(200).json({
        success: true,
        data: localeFile,
    });

});

export default getLocale;
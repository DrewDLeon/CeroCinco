const tbl_campanas = require('../models/tbl_campanas');

const adminCampanasController = {
    getCampanasAdmin: async function(req, res){
        try {
            const campanas = await tbl_campanas.getCampanasAdmin();
            res.status(200).json(campanas);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Error al obtener las campañas'});
        }
    }
}

module.exports = adminCampanasController;
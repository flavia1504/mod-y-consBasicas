const db = require('../database/models');
const sequelize = db.sequelize;
const { validationResult } = require("express-validator");

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
       res.render("moviesAdd")
    },
    create: function (req, res) {
        const {title, rating, number, awards, release_date, length, } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render("moviesAdd",{errors:errors.mapped(),old:req.body})
        }else{
            db.Movie.create({
                title: title.trim(),
                rating: rating,
                awards,
                release_date,
                length,
                
            })
            res.redirect("/movies")
        }
        
    },
    edit: function(req, res) {
        const {id} = req.params;
        db.Movie.findByPk(id)
        .then((response)=>{
            res.render("moviesEdit",{Movie:response.dataValues})
        }).catch(err=>console.log(err))
        
    },
    update: function (req,res) {
        const errors = validationResult(req)
        const {id} = req.params;
        if (!errors.isEmpty()) {

        db.Movie.findByPk(id)
        .then((response)=>{
            res.render("moviesEdit",{Movie:response.dataValues,errors:errors.mapped(), old:req.body})
        }).catch(err=>console.log(err))
        }else {
            const {title, rating, number, awards, release_date, length} = req.body;        
            db.Movie.update({
                title: title.trim(),
                rating: rating,
                awards,
                release_date,
                length,
                
            },
            {
                where:{
                    id,
                }
            })
                res.redirect(`/movies`)
        }
        
    },
    delete: function (req, res) {
        const {id} = req.params;
        db.Movie.findByPk(id)
        .then((response)=>{
            res.render("moviesDelete",{Movie:response.dataValues})
        })
    },
    destroy: function (req, res) {
        const {id} = req.params;
        db.Movie.destroy({
            where:{
                id,
            }
        })
            res.redirect("/movies");
       
    }

}

module.exports = moviesController;
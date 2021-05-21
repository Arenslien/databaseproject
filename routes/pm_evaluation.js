// 기본 모듈 Import
var express = require('express');
var router = express.Router();
const { PMEvaluation } = require('../models');

// 라우터 설정
router.route('/')
.get(async (req, res, next) => {
    res.render('evaluation/pm_evaluation');
})
.post(async (req, res, next) => {
    try {
        console.log(req.body);
        console.log(req.session.user);
        console.log(req.session.authorization);
        const pmEvaluation = await PMEvaluation.create({
            evaulation_content1:  req.body.content1,
            evaulation_score1:  req.body.score1,
            evaulation_content2:  req.body.content2,
            evaulation_score2:  req.body.score2,
            evaluator_no: req.session.user.emp_no,
            // non_evaluator_no: ,
            // project_no: ,
            
        });
        console.log('새로운 PM 평가가 등록되었습니다.');

        res.status(201).json(pmEvaluation);
    } catch (err) {
        console.log("PM 평가가 등록되지 않았습니다.");
        next(err);
    }

});

router.route('/:id')
.delete(async (req, res, next) => {
    try {
        const result = await PMEvaluation.destroy({ where: { id: req.params.id } });
        res.json(result);
      } catch (err) {
        console.error(err);
        next(err);
      }
});

module.exports = router;
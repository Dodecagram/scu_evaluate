function getToken(){
	return fetch('/student/rollManagement/personalInfoUpdate/index').then(res=>res.text()).then(res=>res.match(/name="tokenValue" value="(.*?)"/)[1]);
}
function evaluate(Tea_List){
	getToken()
	.then(tokenValue=>{
		let eva = Promise.resolve(tokenValue);
		for(let i in Tea_List){
            eva = eva.then((tokenValue)=>{
				let Evaluation_post = Evaluation + 'zgpj=' + encodeURIComponent(Evaluation_word[Math.floor(Math.random() * Evaluation_word.length)]);
                var questionnaireCode = Tea_List[i][0];
                var evaluationContentNumber = Tea_List[i][2];
                var evaluatedPeopleNumber = Tea_List[i][1];
				return fetch('/student/teachingEvaluation/teachingEvaluation/evaluation', {method: 'post',headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
					body: 'tokenValue='+ tokenValue +'&questionnaireCode='+ questionnaireCode +'&evaluationContentNumber='+ evaluationContentNumber +'&evaluatedPeopleNumber='+ 
						evaluatedPeopleNumber +'&count=0&' + Evaluation_post,
					}).then(res=>res.json()).then(res=>res.token).then(res=>new Promise(r=>setTimeout(r,1000*121,res)));
            })
		}

	})
}
var Evaluation_word = ['这是一个热爱教学，并能向我传递正能量的优秀教师。', '课堂讨论、互动的方式在这门课程中得到了有效的实施。', '教师对课程的过程考核环节有清晰说明、设计合理、评价标准公正', '这是一名负责的老师'];
var Evaluation = (new Array(200).fill(1).map((x,idx)=>('0000000000' + (1 + idx)).slice(-10)).join('=10_1&') + '=10_1&');
fetch('/student/teachingEvaluation/teachingEvaluation/search').then(res=>res.json()).then(res=>res.data).then(res=>{let needEvaluated = [];res.forEach(x=>{if(x.isEvaluated != '是'){needEvaluated.push([x.id.questionnaireCoding,x.id.evaluatedPeople,x.id.evaluationContentNumber])}});return needEvaluated;}).then(res=>{
	evaluate(res);
});

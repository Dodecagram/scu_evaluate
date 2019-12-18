//忘了之前写过，今年又随便码了一个。。。。
{
	let words = ['优秀', '完美', '讲得很好', '不错'].map(x=>encodeURI(x));
	let teachers = [];
	document.querySelectorAll('#jxpgtbody tr').forEach(x=>{
		let vals = x.querySelector('td:nth-of-type(1) button').attributes.onclick.nodeValue.match(/\((.*)\)/)[1].replace(/"/g, '').split(',');
		if(x.querySelector('td:last-of-type').innerHTML == '否') teachers.push(vals);
	});
	let ques = (new Array(300)).fill(0).map((x,i)=>('0000000000'+i).slice(-10)).map(x=>x+'=10_1').join('&');
	let resolve = Promise.resolve();
	teachers.forEach(x=>{
		resolve = resolve.then(()=>
			fetch('http://202.115.47.141/student/rollManagement/personalInfoUpdate/index')
			.then(res=>res.text())
			.then(res=>(new DOMParser()).parseFromString(res, 'text/html'))
			.then(res=>res.querySelector('#frm1 input[name=tokenValue]').attributes.value.nodeValue)
		)
		.then(token=>{
			fetch('http://202.115.47.141/student/teachingEvaluation/teachingEvaluation/evaluationPage',{
				method: 'post',
				headers:{
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				},
				body:'evaluatedPeople='+x[3]+'&evaluatedPeopleNumber='+x[2]+'&questionnaireCode='+x[0]+'&questionnaireName='+x[1]+'&evaluationContentNumber='+x[4]+'&evaluationContentContent='
			})
			return token;
		})
		.then(token=>{
			fetch('http://202.115.47.141/student/teachingEvaluation/teachingEvaluation/evaluation',{
				method: 'post',
				headers:{
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				},
				body:'tokenValue='+token+'&questionnaireCode='+x[0]+'&evaluationContentNumber='+x[4]+'&evaluatedPeopleNumber='+x[2]+'&count=0&'+ques+'&zgpj='+words[parseInt(Math.random()*words.length)]
			})
		})
		.then(()=>
			new Promise(reso=>{
				setTimeout(reso, 1000*15);
        	})
		)
	})
}

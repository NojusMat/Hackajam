
function subjects() {
    let subjects = [
        {backColour: "#26738B",title:"English", xp:50, encouragementMessage:"You did well on",encouragedTopic:"Vowels", currentTopic:"Adjectives"},
        {backColour: "#B75959",title:"Maths", xp:250, encouragementMessage:"Good work on",encouragedTopic:"Subtraction", currentTopic:"Multiplication"},
        {backColour: "#78A964",title:"Geography", xp:0, encouragementMessage:"Keep up the good effort on",encouragedTopic:"Continents", currentTopic:"Continents"},
        ];
    let subjectList = "";
    subjects.map(subject => subjectList += `<div style="border-color:${subject.backColour}" class="subjectOverview">
    <div class="subjectOverviewHeader">
        <p class="subjectName">${subject.title}</p>
        <p class="subjectTotalXP">Gained <span class="xpModifier">${subject.xp}</span>xp total</p>
    </div>
    <div class="subjectOverviewComments">
        <p class="subjectFeedback"><span class="subjectEncouragementMessage">${subject.encouragementMessage}</span> <span class="subjectToEncourage">${subject.encouragedTopic}</span>!</p>
        <p class="subjectNextUp">You are currently doing <span class="linkToNextTopic">${subject.currentTopic}</span></p>
    </div>
  </div>`)
    document.getElementById("subjectsBox").innerHTML = subjectList
 
}

function mcq(subject, topic) {
    let english = [
        {vowels:[
            {question:"Which of these is the vowel?",answer:"e",incorrects:["x","w","j"]},
            {question:"Which of these is not the vowel?",answer:"j",incorrects:["e","a","i"]},
            {question:"Which of these is not the vowel?",answer:"y",incorrects:["a","o","u"]},
            {question:"Which of these is the vowel?",answer:"u",incorrects:["v","w","j"]},
        ]},
        {adjectives:[{question:"Which of these is not an adjective?",answer:"walking",incorrects:["red","enormous","flat"]}]}
    ]

    let maths = [
        {addition:[
            {question:"What is 2 + 2?",answer:"4",incorrects:["5","7","2"]},
            {question:"What is 6 + 11?",answer:"17",incorrects:["15","4","10"]},
            {question:"What is 5 + 3?",answer:"8",incorrects:["3","11","9"]}
        ]},
        {subtraction:[
            {question:"What is 5 - 4?",answer:"1",incorrects:["3","9","2"]},
            {question:"What is 10 - 4?",answer:"6",incorrects:["8","2","3"]},
            {question:"What is 3 - 3?",answer:"0",incorrects:["14","9","6"]}
        ]},
        {multiplication:[
            {question:"What is 2 * 2?",answer:"4",incorrects:["10","0","2"]},
            {question:"What is 4 * 4?",answer:"16",incorrects:["4","44","2"]},
            {question:"What is 8 * 1?",answer:"8",incorrects:["16","7","2"]}
        ]}
    ]

    let geography = [
        {continents:[
            {question:"What continent can you find Germany in?",answer:"Europe",incorrects:["Asia","Africa","South America"]},
            {question:"What continent can you find Mongolia in?",answer:"Asia",incorrects:["Europe","Africa","South America"]},
            {question:"What continent can you find Peru in?",answer:"South America",incorrects:["Asia","Africa","North America"]}
        ]},
            
        {capital_cities:[
            {question:"What is the capital city of Ireland?",answer:"Dublin",incorrects:["Galway City","Paris","Madrid"]},
            {question:"What is the capital city of Mexico?",answer:"Mexico City",incorrects:["Baku","London","New York"]},
            {question:"What is the capital city of Panama?",answer:"Panama City",incorrects:["Dublin","Berlin","Mexico City"]}
        ]}
    ]


    let questionList = []

    if(subject == "english") {
        if (topic == "vowels") {
            let data = english[0].vowels
            questionList = questionHTMLgenerate(data)}
        else if (topic == "adjectives") {
            let data = english[0].adjectives
            questionList = questionHTMLgenerate(data)}
    }
    else if (subject == "maths") {
        if (topic == "addition") {
            let data = maths[0].addition
            questionList = questionHTMLgenerate(data)}
        else if (topic == "subtraction") {
            let data = maths[1].subtraction
            questionList = questionHTMLgenerate(data)}
        else if (topic == "multiplication") {
            let data = maths[2].multiplication
            questionList = questionHTMLgenerate(data)}
    }
    else if (subject == "geography") {
        if (topic == "continents") {
            let data = geography[0].continents
            questionList = questionHTMLgenerate(data)
            }
        else if (topic == "capital_cities") {
            let data = geography[1].capital_cities
            questionList = questionHTMLgenerate(data)
        }
    }

    document.getElementById("mcqBox").innerHTML = questionList
    
}

function questionHTMLgenerate(data) {
    let questionList = []
    for(i = 0; i < data.length; i++) {
        let question = {questionText:"",questionOptions:[], answer:""}

        question.questionText = data[i].question
        question.questionOptions.push(data[i].answer)
        data[i].incorrects.map(incorrect => question.questionOptions.push(incorrect))
        
        question.questionOptions = question.questionOptions.sort((a, b) => 0.5 - Math.random());
        question.answer = data[i].answer
        
        let q1IsCorrect = question.questionOptions[0] == question.answer ? "correct" : "incorrect";
        let q2IsCorrect = question.questionOptions[1] == question.answer ? "correct" : "incorrect";
        let q3IsCorrect = question.questionOptions[2] == question.answer ? "correct" : "incorrect";
        let q4IsCorrect = question.questionOptions[3] == question.answer ? "correct" : "incorrect";

        console.log(q1IsCorrect)

        let questionHTML = `
        <div class="questionBox">
            <p class="questionText">${question.questionText}</p>
            <div class="questionGrid">
                <div onclick="(optionSelect('${q1IsCorrect}', event))" class="questionGridItem">${question.questionOptions[0]}</div>
                <div onclick="(optionSelect('${q2IsCorrect}', event))" class="questionGridItem">${question.questionOptions[1]}</div>
                <div onclick="(optionSelect('${q3IsCorrect}', event))" class="questionGridItem">${question.questionOptions[2]}</div>
                <div onclick="(optionSelect('${q4IsCorrect}', event))" class="questionGridItem">${question.questionOptions[3]}</div>
            </div>
        </div>`
        questionList.push(questionHTML)
    }
    return questionList
}

optionSelect = (isCorrect,e) => {
    isCorrect == "correct" ? e.target.style.backgroundColor = "#99ff99" : e.target.style.backgroundColor = "#ff9999"
    
}

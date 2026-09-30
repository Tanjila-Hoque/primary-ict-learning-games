const questionBank = [
  {category:"Computer Basics",difficulty:"Easy",emoji:"💻",q:"What does ICT stand for?",a:["Information and Communication Technology","Internet Computer Tool","Information Class Training","International Computer Team"],correct:0,why:"ICT means Information and Communication Technology. It includes technologies used to create, store and communicate information.",hint:"Think about the words used when people communicate and work with information using technology."},
  {category:"Devices",difficulty:"Easy",emoji:"⌨️",q:"Which device is mainly used to type letters and numbers into a computer?",a:["Monitor","Keyboard","Speaker","Projector"],correct:1,why:"A keyboard is an input device used to enter letters, numbers and commands.",hint:"It has many keys with letters, numbers and symbols."},
  {category:"Devices",difficulty:"Easy",emoji:"🖱️",q:"Which device lets you point, click and select items on the screen?",a:["Mouse","Printer","Microphone","Scanner"],correct:0,why:"A mouse controls the pointer and lets you click, select and drag items on the screen.",hint:"You usually move it across a flat surface beside the computer."},
  {category:"Computer Basics",difficulty:"Medium",emoji:"📄",q:"Which application is commonly used to create and edit documents?",a:["Calculator","MS Word","Camera","Music Player"],correct:1,why:"MS Word is a word-processing application designed for creating and editing documents.",hint:"Think about the type of file used for letters, reports and homework."},
  {category:"Internet Safety",difficulty:"Medium",emoji:"🛡️",q:"Which is the safest thing to do if a stranger online asks for your password?",a:["Share it quickly","Send your address too","Keep it private and tell a trusted adult","Post it in a group"],correct:2,why:"Passwords are private. A child should not share them with strangers and should tell a trusted adult when something feels unsafe.",hint:"Personal login details should be treated as private information."},
  {category:"Computer Basics",difficulty:"Medium",emoji:"📊",q:"Which program is best suited to making slides for a school presentation?",a:["PowerPoint","Calculator","File Explorer","Clock"],correct:0,why:"PowerPoint is presentation software designed for creating slides with text, images and other media.",hint:"Think of software made specifically for slides."},
  {category:"Internet Safety",difficulty:"Easy",emoji:"🔒",q:"Which password is generally stronger?",a:["123456","password","Rina2026!Tree","qwerty"],correct:2,why:"A stronger password is longer and uses a mix of letters, numbers and symbols rather than an obvious common word or sequence.",hint:"Avoid simple patterns and common words. Variety and length help."},
  {category:"Devices",difficulty:"Medium",emoji:"🎤",q:"Which device can capture your voice for a computer?",a:["Microphone","Monitor","Printer","Keyboard"],correct:0,why:"A microphone captures sound and sends audio into a computer or other device.",hint:"Think about the device used when speaking during a voice recording."},
  {category:"Internet Safety",difficulty:"Medium",emoji:"🌐",q:"You see a strange pop-up saying you won a prize. What should you do?",a:["Click it immediately","Give it your personal details","Close it and tell a trusted adult if needed","Download every file it offers"],correct:2,why:"Unexpected prize pop-ups can be misleading or unsafe. Closing them and asking a trusted adult is a safer choice.",hint:"Unexpected prizes online should be treated carefully, especially when they ask for information or downloads."},
  {category:"Computer Basics",difficulty:"Easy",emoji:"🖨️",q:"What is a printer mainly used for?",a:["Putting information onto paper","Playing music","Typing passwords","Connecting headphones"],correct:0,why:"A printer produces a physical copy of digital content, such as a document or picture, on paper.",hint:"It changes something on the screen into something you can hold."},
  {category:"Internet Safety",difficulty:"Medium",emoji:"👨‍👩‍👧",q:"Who is a good person to tell when something online makes you uncomfortable?",a:["A trusted adult","A random stranger","Nobody ever","An unknown gaming account"],correct:0,why:"A parent, guardian, teacher or another trusted adult can help a child respond safely to uncomfortable online situations.",hint:"Choose someone responsible who can help you in real life."},
  {category:"Computer Basics",difficulty:"Challenge",emoji:"🧩",q:"Which statement best describes the difference between hardware and software?",a:["Hardware is physical; software is made of programs and instructions","Hardware is always online; software is always offline","Hardware is only for games; software is only for school","They are exactly the same thing"],correct:0,why:"Hardware refers to physical computer components. Software consists of programs and instructions that run on the hardware.",hint:"One category can be touched; the other is the set of programs that tells the computer what to do."}
];

let questions=[], index=0, score=0, streak=0, bestStreak=0, lives=3, answered=false, hintUsed=false, selectedCategory="All", correctCount=0;
const $=id=>document.getElementById(id);

function shuffle(arr){return [...arr].sort(()=>Math.random()-0.5)}
function chooseCategory(cat){selectedCategory=cat;document.querySelectorAll('.category').forEach(b=>b.classList.toggle('active',b.dataset.category===cat))}

document.querySelectorAll('.category').forEach(btn=>btn.addEventListener('click',()=>chooseCategory(btn.dataset.category)));
$('startBtn').addEventListener('click',startQuiz);
$('nextBtn').addEventListener('click',nextQuestion);
$('hintBtn').addEventListener('click',showHint);
$('restartBtn').addEventListener('click',startQuiz);
$('homeBtn').addEventListener('click',()=>{ $('resultScreen').classList.add('hidden'); $('startScreen').classList.remove('hidden'); });

document.addEventListener('keydown',e=>{if($('quizScreen').classList.contains('hidden'))return;if(['1','2','3','4'].includes(e.key)&&!answered){const b=document.querySelectorAll('.ans')[Number(e.key)-1];if(b)b.click()}if(e.key==='Enter'&&answered)$('nextBtn').click();});

function startQuiz(){
  const pool=selectedCategory==='All'?questionBank:questionBank.filter(x=>x.category===selectedCategory);
  questions=shuffle(pool).slice(0,Math.min(12,pool.length));
  index=0;score=0;streak=0;bestStreak=0;lives=3;correctCount=0;
  $('score').textContent=score;$('streak').textContent=streak;$('lives').textContent=lives;
  $('startScreen').classList.add('hidden');$('resultScreen').classList.add('hidden');$('quizScreen').classList.remove('hidden');
  renderQuestion();
}

function renderQuestion(){
  answered=false;hintUsed=false;$('nextBtn').disabled=true;$('hintBox').classList.add('hidden');$('feedback').className='feedback hidden';
  const item=questions[index];
  $('questionCount').textContent=`Question ${index+1} of ${questions.length}`;
  $('categoryLabel').textContent=item.category;
  $('progressBar').style.width=`${((index)/questions.length)*100}%`;
  $('difficulty').textContent=item.difficulty.toUpperCase();$('questionEmoji').textContent=item.emoji;
  $('questionText').textContent=item.q;$('questionHintText').textContent='Choose the best answer. You can also use a hint!';
  const answers=$('answers');answers.innerHTML='';
  item.a.forEach((text,i)=>{const b=document.createElement('button');b.className='ans';b.type='button';b.innerHTML=`<span class="letter">${String.fromCharCode(65+i)}</span><span>${escapeHtml(text)}</span>`;b.addEventListener('click',()=>selectAnswer(i));answers.appendChild(b)});
}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}

function selectAnswer(choice){
  if(answered)return;answered=true;
  const item=questions[index], buttons=document.querySelectorAll('.ans');
  buttons.forEach(b=>b.disabled=true);
  buttons[choice].classList.add('selected');
  if(choice===item.correct){
    correctCount++;streak++;bestStreak=Math.max(bestStreak,streak);score+=10+(streak-1)*2+(hintUsed?-2:0);buttons[choice].classList.add('correct');
    showFeedback(true,`🌟 ${item.why}`);
  }else{
    streak=0;lives=Math.max(0,lives-1);buttons[choice].classList.add('wrong');buttons[item.correct].classList.add('correct');
    showFeedback(false,`💡 ${item.why}`);
  }
  $('score').textContent=score;$('streak').textContent=streak;$('lives').textContent=lives;$('nextBtn').disabled=false;
  $('progressBar').style.width=`${((index+1)/questions.length)*100}%`;
}
function showFeedback(good,text){const f=$('feedback');f.textContent=text;f.className=`feedback ${good?'good':'bad'}`}
function showHint(){if(answered||hintUsed)return;hintUsed=true;$('hintBox').textContent=`💡 Hint: ${questions[index].hint}`;$('hintBox').classList.remove('hidden');}
function nextQuestion(){if(!answered)return;index++;if(index>=questions.length){finishQuiz();return}renderQuestion()}

function finishQuiz(){
  $('quizScreen').classList.add('hidden');$('resultScreen').classList.remove('hidden');
  const total=questions.length, accuracy=Math.round(correctCount/total*100);
  $('finalScore').textContent=score;$('correctCount').textContent=`${correctCount}/${total}`;$('accuracy').textContent=`${accuracy}%`;$('bestStreak').textContent=bestStreak;
  let title='Keep Exploring! 🌱',msg='Every question is a chance to learn something new.',icon='🌱',badge='🌟 Curious Learner';
  if(accuracy>=90){title='ICT Superstar! 🏆';msg='Amazing work! You showed strong ICT knowledge.';icon='🏆';badge='👑 ICT Superstar'}
  else if(accuracy>=70){title='Brilliant Explorer! 🌟';msg='Great job! Your ICT skills are growing fast.';icon='🌟';badge='🚀 ICT Explorer'}
  else if(accuracy>=50){title='Nice Try! 💪';msg='You are learning well. Try again and beat your score!';icon='💪';badge='🧠 Growing Genius'}
  $('resultTitle').textContent=title;$('resultMessage').textContent=msg;$('resultIcon').textContent=icon;$('achievement').textContent=badge;
  if(accuracy>=70)launchConfetti();
}
function launchConfetti(){const box=$('confetti');box.innerHTML='';for(let i=0;i<70;i++){const c=document.createElement('i');c.className='confetti';c.style.left=Math.random()*100+'vw';c.style.animationDelay=(Math.random()*.6)+'s';c.style.transform=`rotate(${Math.random()*360}deg)`;c.style.background=['#ff7b54','#ffd166','#6c8cff','#62d89a','#d47cff'][Math.floor(Math.random()*5)];box.appendChild(c)}setTimeout(()=>box.innerHTML='',2500)}

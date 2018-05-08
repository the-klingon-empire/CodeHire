const router = require('express').Router();


const challengeControllers = require('./controllers/challenges');
const authControllers = require('./controllers/auth');
const calendarControllers = require('./controllers/calendar');

/* ------- User Routes --------- */

// get company Information
router.get('/api/companyInfo', (req, res) => {
  authControllers.getCompanyInfo(req.query.username, (data) => {
    res.status(200).send(data);
  })
})

router.get('/api/candidateInfo', (req, res) => {
  authControllers.getCandidateInfo(req.query.username, (data) => {
    res.status(200).send(data);
  })
})


// update company profile information in 'users' table
router.patch('/api/companyInfo/:username', (req, res) => {
  authControllers.updateCompanyInfo(req.body.username, req.body.logo_url, req.body.information)
  .catch((err) => {
    console.log(err);
  })
})

router.patch('/api/candidateInfo/:username', (req, res) => {
  authControllers.updateCandidateInfo(req.body.username, req.body.information, req.body.skills)
  .catch((err) => {
    console.log(err);
  })
})

// authentication route for logging in, check 'users' table for credentials
router.post('/api/login', (req, res) => {
  authControllers.handleLogin(req.body.username, req.body.password, (status) => {
    res.status(201).send(status);
  })
  .catch((err) => {
    console.log(err);
  })
})


// post candidate register info to 'users' table
router.post('/api/registerCandidate', (req, res) => {
  authControllers.saveCandidate(req.body.fullName, req.body.username, req.body.password, req.body.email, req.body.phone, (status) => {
    res.status(201).send(status);
  })
  .catch((err) => {
    console.log(err);
  })
})

// post company register information into 'users' table
router.post('/api/registerCompany', (req, res) => {
  authControllers.saveCompany(req.body.companyName, req.body.username, req.body.password, req.body.email, req.body.phone, req.body.logoUrl, req.body.information, (status) => {
    res.status(201).send(status);
  })
})


/* ---------- Challenge Routes --------- */

// get all challenges from 'all_challenges' table
router.get('/api/challenges', (req, res) => {
  let companyId = req.query.companyId || 2;
  challengeControllers.getCompanyChallenges(companyId)
  .then((data) => {
    res.send(data);
  })
})

// get default challenges from 'all_challenges' table
router.get('/api/defaultChallenges', (req, res) => {
  challengeControllers.getDefaultChallenges()
  .then((data) => {
    res.send(data);
  })
})

router.post('/api/challenges', (req, res) => {
  console.log(req.body.challenge)
  let title = req.body.challenge.title;
  let instruction = req.body.challenge.instruction;
  let functionName = req.body.challenge.function_name;
  let params = req.body.challenge.parameters;
  let testCases = req.body.test_cases || `[${req.body.challenge.testInput}, ${req.body.challenge.testOutput}]`;
  let examples = req.body.examples || `[${req.body.challenge.exampleInput}, ${req.body.challenge.exampleOutput}]` || null;
  let difficulty = req.body.challenge.difficulty || null;
  let companyId = 2;
  challengeControllers.saveChallenge(title, instruction, functionName, params, testCases, examples, difficulty, companyId)
  .then(() => {
    res.send('Successfully saved challenge');
  })
})

// delete company challenge from 'all_challenges' table
router.delete('/api/challenges', (req, res) => {
  let query = JSON.parse(req.query.challenge)
  let title = query.title;
  let companyId = 2;
  challengeControllers.deleteCompanyChallenge(title, companyId)
  .then(() => {
    res.send('Successfully deleted challenge');
  })
})

// post initial challenge info into 'intiial_challenges table'
router.post('/api/initialChallenge', (req, res) => {

})

// update initial challenge from 'intitial_challenges table'
router.patch('/api/initialChallenge/:challengeid', (req, res) => {

})

// get initial challenge for company
router.get('/api/initialChallenge', (req, res) => {
  let companyId = req.query.company_id;
  challengeControllers.getInitialChallenge(companyId)
  .then((data) => {
    res.send(data);
  })
})

// delete company challenge from 'all_challenges' table
router.delete('./api/challenges/:challengeid', (req, res) => {

})

// delete company challenge from 'all_challenges' table
router.delete('./api/challenges/:challengeid', (req, res) => {

})

/* ---------- Schedule Routes -------- */

// get user schedule
router.get('/api/userCalendar', (req, res) => {

})

// update user calendar
router.post('/api/userCalendar', (req, res) => {

})

// update user Calendar
router.patch('/api/userCalendar:date', (req, res) => {

})

// get company schedule
router.get('/api/companyCalendars', (req, res) => {
  calendarControllers.getAllCompanyCalendars()
  .then((data) => {
    res.send(data);
  })
})
// add to company Calendar
router.post('/api/companyCalendar', (req, res) => {
  let time = req.body.time;
  let duration = Number(req.body.duration);
  let challengeId = req.body.challengeId;
  let companyId = 2;
  calendarControllers.addToCompanySchedule(time, duration, challengeId, companyId)
  .then(() => {
    console.log('Successfully saved challenge to schedule');
  })
  .catch((err) => {
    console.log('Could not save to company schedule', err);
  })
})

//fetch single company's schedule
router.get('/api/companyCalendar', (req, res) => {
  let companyId = 2;
  calendarControllers.getCompanySchedule(companyId)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    console.log(err);
  })
})


// update company calendar
router.patch('/api/companyCalendar:date', (req, res) => {


})


/* ------- Results Routes -------- */

// get results data from 'results' table
router.get('/api/results', (req, res) => {
  
})

// post results to 'results' table
router.post('/api/results', (req, res) => {

})












module.exports = router;


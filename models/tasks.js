const uuid = require('uuid/v1')

const tasks=[
    {"id":uuid(), "task": "Post newsletter to facebook", "by": "Hanim", "done": false},
    {"id":uuid(), "task": "Post happy new year on Twitter" , "by": "3", "done": false},
    {"id":uuid(), "task": "Post React assigmnet", "by": "Andy", "done": false},
    {"id":uuid(), "task": "Announce company dinner on facebook", "by": "2", "done": false}
]
module.exports=tasks;
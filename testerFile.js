const models = require('./models');
const User = models.User;
const List = models.List;
const ListItem = models.ListItem;

// User.create({
//     firstName: 'Spencer',
//     lastName: 'Smith',
//     username: 'spencersmith',
//     password: 'password123'
// })
// .then((user) => {
//     console.log(user.get())
// })
// .catch((err) => {
//     console.log('Error while finding user:', err)
// })

// List.create({
//     userId: 1,
//     name: 'test list 5'
// })
// .then((list) => {
//     console.log(list.get())
// })
// .catch((err) => {
//     console.log('Error while finding user:', err)
// })

User.findOne({
    where: {username: 'spencersmith'}, include: 'lists'
})
.then((user) => {
    console.log(user)
})
.catch((err) => {
    console.log("Error while finding user : ", err)
})
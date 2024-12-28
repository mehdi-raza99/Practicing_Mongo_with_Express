
const mongoose=require('mongoose');
const qoute=require('./models/qoute')
main().then(() => {
    console.log('Connection Established!')
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/qoutes');
}

//INSERTION OF SAMPLE DATA IN MONGO

let  allQoutes=[
    {
        uploader: "Sarah",
        author: "Nelson Mandela",
        qoute: "It always seems impossible until it's done."
    },
    {
        uploader: "John",
        author: "Mahatma Gandhi",
        qoute: "Be the change that you wish to see in the world."
    },
    {
        uploader: "Emily",
        author: "William Shakespeare",
        qoute: "To be, or not to be, that is the question."
    },
    {
        uploader: "Liam",
        author: "Mark Twain",
        qoute: "The secret of getting ahead is getting started."
    },
    {
        uploader: "Ava",
        author: "Steve Jobs",
        qoute: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work."
    },
    {
        uploader: "Noah",
        author: "Oscar Wilde",
        qoute: "Be yourself; everyone else is already taken."
    },
    {
        uploader: "Olivia",
        author: "Winston Churchill",
        qoute: "Success is not final, failure is not fatal: It is the courage to continue that counts."
    }
]


qoute.insertMany(allQoutes).then((res) => {console.log(res);
})

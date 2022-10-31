const { Telegraf } = require("telegraf")
const { Markup } = require("telegraf")
const dotenv = require("dotenv")
const express = require("express")
const app = express();
dotenv.config();
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
bot.use(Telegraf.log());
let lang = null;
let users = [];
bot.command("start",(ctx) =>{
   ctx.replyWithHTML( `<b>"U-TOP" kompaniyasi haqida ma'lumot</b>
   Bizning kompaniya quyidagi qadriyatga ega insonlarni qidirmoqda🤷🏻‍♂️
   
   ▪️Halollik va Xushmuomulalik
   ▪️Ishini sevish
   ▪️Tez o'rganish va o'rgatish
   ▪️Doim o'zgalarga yordam berish
   ▪️Va o'sishdan xech qachon to'xtamaydigan
   
✅Agar siz shunday insonlardan biri bulsangiz quyidagi formani to'ldiring 😉 va  bizga qo'shiling!
   
<b>Boshlash uchun hujjat topshirish tugmasini  tanlang</b>⤵️`,Markup.keyboard([
      ["📋 Hujjat topshirish"],
      ["🔙 Orqaga","🔝 Bosh sahifa"]
])
.oneTime()
.resize()
)
})
bot.hears("🔝 Bosh sahifa",(ctx) => {
      lang = true
      ctx.replyWithHTML(`<b>Siz bosh sahifaga qaytdingiz</b>`,Markup.keyboard([
            ["📋 Hujjat topshirish"],
            ["🔙 Orqaga","🔝 Bosh sahifa"]
      ])
      .oneTime()
      .resize()
      )
})
// bot.hears("🔝 Bosh sahifa",(ctx) => {
//       ctx.replyWithHTML(`<b>Siz bosh sahifaga qaytdingiz</b>`,Markup.keyboard([
//             ["🇺🇿 O'zbek","🇷🇺 Кирил"]])
//             .oneTime()
//             .resize())
// })
bot.hears("🔙 Orqaga",(ctx) => {
      ctx.replyWithHTML(`<b>Siz bosh sahifaga qaytdingiz</b>`,Markup.keyboard([
            ["📋 Hujjat topshirish"],
            ["🔙 Orqaga","🔝 Bosh sahifa"]])
            .oneTime()
            .resize())
})

bot.hears("❌ Bekor qilish",(ctx) => {
      lang = true
      ctx.reply("Hujjatlarni faqat O'zbekchada yozing",Markup.keyboard([
            ["📋 Hujjat topshirish"],
            ["🔙 Orqaga","🔝 Bosh sahifa"]
      ])
      .oneTime()
      .resize()
      )
})
bot.hears("🇷🇺 Кирил",(ctx) => {
      lang =false
      ctx.reply("Hujjatlarni faqat ruschada yozing",Markup.keyboard([
            ["📋 Ҳужжат топшириш!"],
            ["🔙 Орқага","🔝 Бош саҳифа"]
      ])
      .oneTime()
      .resize()
      )
})
let fullname,birth,isMale,education,skills;
bot.hears("📋 Hujjat topshirish",(ctx) => {
            users = []
            ctx.replyWithHTML(`<b>Ism, familiya, sharifingizni kiriting!</b>
<i>(Misol uchun: Abbos Abbosov Abbosovich (o'g'li))</i>`)
            
      
})


bot.hears("📋 Ҳужжат топшириш!",(ctx,next) => {
      ctx.replyWithHTML(`<b>Исм, фамилия, шарифингизни киритинг!</b>
      <i>(Мисол учун: Аббос Аббосов Аббосович ўғли))</i>`)
      if(lang){
            askName(ctx,next);
      }else if(lang){
            ctx.reply("russkiy ishlavotti")
      }
})
bot.on("text",(ctx) =>{
         if(!users[0]){
               users.push(ctx.message.text)
               ctx.replyWithHTML(`<b>Tug'ilgan kuningizni kiriting :</b>
 <i>Misol uchun: (01.01.2000/kun.oy.yil)</i>`,Markup.keyboard(["❌ Bekor qilish"]).oneTime().resize())
         }else if(!users[1]){
            users.push(ctx.message.text)
            ctx.replyWithHTML(`<b>Telefon nomeringizni kiriting :</b>
<i>Misol uchun: (901010101)</i>`)
      }else if(!users[2]){
            users.push(ctx.message.text)
            ctx.replyWithHTML(`<b>Yashash manzilingizni kiriting:</b>
<i>Misol uchun: Toshkent shahar, Shayxontohur tumani, Qoratosh mahallasi, 10-uy</i>`)
      }
         else if(!users[3]){
               users.push(ctx.message.text);
               ctx.replyWithHTML("<b>Tanlang !</b>",Markup.inlineKeyboard([[Markup.button.callback("Erkak","erkak"),Markup.button.callback("Ayol","ayol")]]),Markup.keyboard(["❌ Bekor qilish"]))
         }
         else if(!users[6]){
             users.push(ctx.message.text)
             ctx.replyWithHTML(`<b>Qobilyatlaringizni yozing!</b>
<i>(qo'lizdan keladigan barcha narsa yozing)   </i>          `)
         }else if(!users[7]){
            users.push(ctx.message.text)
            ctx.replyWithHTML(`<b>Maqsad va g'oyalaringizni yozing</b>`)
        }
         else if(!users[8]){
            users.push(ctx.message.text)
            ctx.replyWithHTML(`🔤 Ism , sharif :  ${users[0]}
🎁 Tug'ilgan kun: ${users[1]}
📞 Tel nomer : ${users[2]}
🏠 Yashash manzil : ${users[3]}
Jinsi : ${users[4]}
👨‍🎓 Ta'limi : ${users[5]}
🏛Ta'lim olgan muassasa nomi : ${users[6]}
👨‍💻Qobiliyatlari : ${users[7]}
📈 Maqsadlari :  ${users[8]}
Hammasi to'g'ri bulsa saqlash tugmasini bosing`,Markup.inlineKeyboard([Markup.button.callback("✅Saqlash","saqlash")]))
        }
})
bot.action("saqlash",(ctx) => {
    const Number = parseInt(process.env.CHANNEL_ID)
   bot.telegram.sendMessage(-804420108,`🔤 Ism,familya,sharif :  ${users[0]}
   🎁 Tug'ilgan kun: ${users[1]}
   
   📞 Tel nomer : ${users[2]}
   
   🏠 Yashash manzil : ${users[3]}
   
   Jinsi : ${users[4]}
   
   👨‍🎓 Ta'limi : ${users[5]}
   
   🏛Ta'lim olgan muassasa nomi : ${users[6]}
   
   👨‍💻Qobiliyatlari : ${users[7]}
   
   📈 Maqsadlari :  ${users[8]}
   `)
   users = [];
   ctx.replyWithHTML("<b>Bosh sahifaga qaytdingiz</b>",Markup.keyboard([
         ["📋 Hujjat topshirish"],
         ["🔙 Orqaga","🔝 Bosh sahifa"]
   ])
   .oneTime()
   .resize()
   )
})

bot.action("erkak",(ctx) => {
      users.push("Erkak")
      ctx.replyWithHTML(`<b>Ta'lim darajangizni belgilang.Oxirgi o'qigan joyingizga qarab</b>`,Markup.inlineKeyboard([[Markup.button.callback("O'rta","orta"),Markup.button.callback("O'rta maxsus","maxsus"),Markup.button.callback("Oliy","oliy")]]))
})
bot.action("ayol",(ctx) => {
      users.push("Ayol")
      ctx.replyWithHTML(`<b>Ta'lim darajangizni belgilang .Oxirgi o'qigan joyingizga qarab</b>`,Markup.inlineKeyboard([[Markup.button.callback("O'rta","orta"),Markup.button.callback("O'rta maxsus","maxsus"),Markup.button.callback("Oliy","oliy")]]))
})
bot.action("orta",(ctx) => {
      users.push("O'rta ta'lim")
      ctx.replyWithHTML(`<b>Ta'lim olgan maktabingiz nomi: </b>`)
})
bot.action("maxsus",(ctx) => {
      users.push("O'rta maxsus ta'lim")
      ctx.replyWithHTML(`<b>Ta'lim olgan kollejingiz nomi: </b>`)
})
bot.action("oliy",(ctx) => {
      users.push("Oliy ta'lim")
      ctx.replyWithHTML(`<b>Ta'lim olgan Universitetingiz nomi: </b>`)
})

// function askName(c){
      
//       c.replyWithHTML(`<b>Ism, familiya, sharifingizni kiriting!</b>
//       <i>(Misol uchun: Abbos Abbosov Abbosovich o'g'li)</i>`)
//       bot.on("text",(c,next) =>{
//       fullname = c.message.text
//       if(fullname){
//             console.log("kelmayapti")
//             birthDay(c)
//       }
//       next();
//       })
    
// }
// function  birthDay(c){
      
//       c.replyWithHTML(`<b>Tug'ilgan kuningizni kiriting :</b>
//       <i>Misol uchun: (01.01.2000/kun.oy.yil)</i>`)
//       bot.on("text",(c,next) =>{
//       birth = c.message.text
//       if(birth){
//         console.log("ish");
//         isMail(c);
//       }
//        next();
// })
     
// }
// function isMail(c){
//       c.replyWithHTML("<b>Tanlang !</b>",Markup.inlineKeyboard([[Markup.button.callback("Erkak","erkak"),Markup.button.callback("Ayol","ayol")]]))
//      bot.action("erkak",(ctx) =>{
//            isMale = "Erkak"
//            c.replyWithHTML(`All things shall be ok`)
//      })
//      bot.action("ayol",(ctx) =>{
//            isMale = "Ayol"
//            if(isMale){
//                  c.replyWithHTML(`All things shall be ok`)
//            }
//      })
// }

const PORT = process.env.PORT 

app.listen(PORT,  ()=>{
    console.log(`Listen in the port ${PORT}`)
    })

bot.launch()
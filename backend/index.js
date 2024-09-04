import express from "express"
import mysql2 from "mysql2"
import cors from "cors"

const app = express ()
const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "88-Feco?0511",
    database: "test"
})

//Ha probléma akad a felhasználó beléptetésével, akkor használjuk az alábbi lekérdezést:
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'ide írjuk a jelszavunkat';
//másik megoldás, hogy a mysql2-t hívjuk meg

app.use(express.json()) //felhasználó által létrehozott JSON-formátum küldése POST-ban
app.use(cors()) //cors() függvény használata

app.get("/", (req,res)=>{
    res.json("Üdv a szerveroldalon!")
})
//Adatok kiolvasása - Read (URL-ből)
app.get("/books", (req,res)=>{
    const q = "SELECT * from books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
            return res.json(data)
    })
})

//Adatok létrehozása/küldése - Create (POSTMAN-nal)
app.post("/books", (req,res)=>{
    const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];

    db.query(q,[values], (err,date)=>{
        if(err) return res.json(err)
            return res.json("Könyv sikeresen létrehozva!")
    })
})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id; //params = /books/; id = :id
    const q = " DELETE FROM books WHERE id = ? ";
  
    db.query(q, [bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json("Könyv sikeresen törölve!");
    });
  });

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id; //params = /books/; id = :id
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];
  
    db.query(q, [...values,bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json("Könyvadatok sikeresen módosítva!");
    });
  });

app.listen(8800, ()=>{
    console.log("Backend csatlakoztatva!")
})

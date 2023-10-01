const mysql = require('mysql');


const pool = mysql.createPool({
    connectionLimit   :100,
    host              : process.env.DB_HOST,
    user              :process.env.DB_USER,
    password          :process.env.DB_PASS,
    database          :process.env.DB_NAME
});


exports.view =(req, res)=>{
   // res.render('home');

//connect to DB
pool.getConnection((err, connection)=>{
    if(err) throw err;
    console.log('Connected as ID ' + connection.threadId);
    //use the connection
    connection.query('SELECT * FROM user WHERE status = "active" ', (err, rows)=>{
        // When done with the connection, release it
        connection.release();

        if(!err){
            //res.json({rows});
            res.render('home', {rows});
        }else{
            console.log(err);
        }
        console.log('The data from user table: \n', rows);

    });

});
}
//find user by search bar
exports.find =(req, res)=>{
    //connect to DB
pool.getConnection((err, connection)=>{
    if(err) throw err;
    console.log('Connected as ID ' + connection.threadId);
    let searchTerm = req.body.search;

    //use the connection
    connection.query('SELECT * FROM user WHERE firstName like ? OR lastName like ?' , ['%' + searchTerm + '%', '%' + searchTerm + '%' ], (err, rows)=>{
        // When done with the connection, release it
        connection.release();

        if(!err){
            //res.json({rows});
            res.render('home', {rows});
        }else{
            console.log(err);
        }
        console.log('The data from user table: \n', rows);

    });

});
    
}
exports.addUserForm =(req, res)=>{
    res.render('addUser');
}
//Add a user to the database
exports.createUser =(req, res)=>{
    const {firstName, lastName, email, phone, comments } = req.body;
    //connect to DB
pool.getConnection((err, connection)=>{
    if(err) throw err;
    console.log('Connected as ID ' + connection.threadId);
   

    //use the connection
    connection.query('INSERT INTO user SET firstName = ?, lastName = ?, email= ?, phone = ?, comments = ?', [firstName, lastName, email, phone, comments], (err, rows)=>{
        // When done with the connection, release it
        connection.release();

        if(!err){
            // res.status(200).json({
            //     success : true,
            //     meassage : "record added",
            //     data : rows
            // });
            res.render('addUser', {alert : 'User added Successfully'});
        }else{
            console.log(err);
        }
        console.log('The data from user table: \n', rows);

    });

});
    
}
exports.editUserForm =(req, res)=>{
//connect to DB
pool.getConnection((err, connection)=>{
    if(err) throw err;
    console.log('Connected as ID ' + connection.threadId);
    //use the connection
    connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows)=>{
        // When done with the connection, release it
        connection.release();

        if(!err){
            //res.json({rows});
            res.render('editUser', {rows});
        }else{
            console.log(err);
        }
        console.log('The data from user table: \n', rows);

    });

});
}
//Edit user
exports.update =(req, res)=>{
    const {firstName, lastName, email, phone, comments } = req.body;
    //connect to DB
pool.getConnection((err, connection)=>{
    if(err) throw err;
    console.log('Connected as ID ' + connection.threadId);
   

    //use the connection
    connection.query('UPDATE  user SET firstName = ?, lastName = ?, email= ?, phone = ?, comments = ? WHERE id = ?', [firstName, lastName, email, phone, comments, req.params.id], (err, rows)=>{
        // When done with the connection, release it
        connection.release();

        if(!err){
            pool.getConnection((err, connection)=>{
                if(err) throw err;
                console.log('Connected as ID ' + connection.threadId);
                //use the connection
                connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows)=>{
                    // When done with the connection, release it
                    connection.release();
            
                    if(!err){
                        //res.json({rows});
                        res.render('editUser',{ rows, alert: `${firstName} has been updated.` });
                    }else{
                        console.log(err);
                    }
                    console.log('The data from user table: \n', rows);
            
                });
            
            });
            
        }else{
            console.log(err);
        }
        console.log('The data from user table: \n', rows);

    });

});
    
}
//delete user
exports.delete =(req, res)=>{
    //connect to DB
pool.getConnection((err, connection)=>{
    if(err) throw err;
    console.log('Connected as ID ' + connection.threadId);
   

    //use the connection
    connection.query('DELETE FROM  user  WHERE id = ?', [req.params.id], (err, rows)=>{
        // When done with the connection, release it
        connection.release();

        if(!err){
           res.redirect('/');
            
        }else{
            console.log(err);
        }
        console.log('The data from user table: \n', rows);

    });

});
    
}
exports.singleUser =(req, res)=>{
   //connect to DB
pool.getConnection((err, connection)=>{
    if(err) throw err;
    console.log('Connected as ID ' + connection.threadId);
    //use the connection
    connection.query('SELECT * FROM user WHERE id = ?', [req.params.id] ,(err, rows)=>{
        // When done with the connection, release it
        connection.release();

        if(!err){
            //res.json({rows});
            res.render('singleUser', {rows});
        }else{
            console.log(err);
        }
        console.log('The data from user table: \n', rows);

    });

});

}
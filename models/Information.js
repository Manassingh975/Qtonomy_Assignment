const db = require('../config/db');

class Information {
    constructor(name,age,gender,email,food_choice,tourism_location,Travel_companions, health_issue, Transportation_preferences, Accommodation_choices, file) {
        this.name = name;
        this.age = age ;
        this.gender = gender;
        this.email = email ;
        this.food_choice =food_choice;
        this.tourism_location=tourism_location;
        this.Travel_companions=Travel_companions;
        this.health_issue=health_issue;
        this.Transportation_preferences=Transportation_preferences;
        this.Accommodation_choices=Accommodation_choices;
        this.file = file;
    }
    async save() {
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1;
        let dd = d.getDate();

        let createdAtDate = `${yyyy}-${mm}-${dd}`;

        let sql = `
        insert into information(
            name,
            age,
            gender,
            email,
            food_choice,
            tourism_location,
            Travel_companions,
            health_issue, 
            Transportation_preferences, 
            Accommodation_choices,
            created_at,
            file_path) 
        values
        ('${this.name}',
        '${this.age}', 
        '${this.gender}',
        '${this.email}',
        '${this.food_choice }', 
        '${this.tourism_location}', 
        '${this.Travel_companions}', 
        '${this.health_issue}', 
        '${this.Transportation_preferences}', 
        '${this.Accommodation_choices}', 
        '${createdAtDate}',
        '${this.file}'
        )
        `;

        const  newInformation = db.execute(sql)

        return newInformation
    }

    
    static findAll() {
        let sql = `select * from information`;
        return db.execute(sql)
    }

    static findById(id) {
        let sql = `select * from information where id = ${id}`;
        return db.execute(sql)
    }

    static findByEmail(email) {
        let sql = `select * from information where email = '${email}'`;
        console.log(sql)
        return db.execute(sql)
    }

}

module.exports = Information;
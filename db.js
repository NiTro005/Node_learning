import sqlite3 from 'sqlite3';
const dbName = 'later.sqlite';
const db = new sqlite3.Database(dbName);

db.serialize(() => {
    const sql = `
    CREATE TABLE IF NOT EXISTS articles
    (id integer primary key, title, content TEXT)
    `
    db.run(sql, () => {
        console.log('Create db');
    })
    
})
class Article{
    static all(cb) {
        db.all('SELECT * FROM articles', cb);
    }
    static find(id, cb) {
        db.get('SELECT * FROM articles id = ?', id, cb);
    }
    static create(data, cb) {
        const sql = 'INSERT INTO articles(title, content) VALUES(?, ?)'
        db.run(sql, data.title, data.content, cb);
    }
    static delete(id, cb) {
        if(!id) return cb(new Error('Please providean id'));
        db.run('DELETE FROM articles WHERE ID = ?', id, cb);
    }
}

export {Article};
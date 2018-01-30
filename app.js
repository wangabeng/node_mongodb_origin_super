var express = require('express');
var app = express();
var db = require('./models/db.js');

// 导入数据库模块
var MongoClient = require('mongodb').MongoClient

app.get('/insert', (req, res) => {
	var json = { 
		"name" : "beben",
		'age': 133
	};

	db.insertOne('class', json, (err, result) => {
		if (err) {
			console.log(err);
			return;
		} else {
			console.log('插入成功');
			return;
		}
	})
});

app.get('/find', (req, res) => {
	// json包含查询条件和分页信息
	var json = {
		query: {},
		curPage: 3,
		pageAmount: 30
	};

	// json 是个对象 包含三个参数 {query: Object, limit: Number, skip: Number }
	db.find('class', json, (err, result) => {
		if (err) {
			console.log(err);
			return;
		} else {
			console.log('查询结果是:', result);
			res.send(result);
		}
	})
});


app.get('/delete', (req, res) => {
	var json = { 
		"age" : parseInt(req.query['id'])
		// "abeng" : '15'
	};

	db.delete('class', json, (err, result) => {
		if (err) {
			console.log(err);
			return;
		} else {
			console.log(result);
			res.send('删除成功');
		}
	})
});

app.get('/getcount', (req, res) => {
	var json = {};
	db.getAllCount('class', json, (result => {
		console.log(result);
		res.send(result.toString());
	}));
})

app.listen(3000);

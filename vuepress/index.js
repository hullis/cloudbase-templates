'use strict'

const fs = require('fs')
const git = require('simple-git')

/**
 * 初始化git
 */
let gitEntity = git("F:/www/my/cloudbase-templates")

// 提交
upDataFile()

function upDataFile() {
	const time = Date()
	gitCommit(time)
}

// commit 提交
function gitCommit(time) {
	gitEntity
	.add('./*')
	.commit('更新 ' + time)
	.push(['-u', 'origin', 'master'], (e) => {
		console.log('commit 成功，时间：' + time)
	})
}
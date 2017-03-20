/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50520
Source Host           : localhost:3306
Source Database       : ihome

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2017-03-18 16:59:06
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(40) NOT NULL COMMENT '用户名',
  `pwd` int(40) NOT NULL COMMENT '登录密码',
  `creatTime` datetime NOT NULL COMMENT '该用户注册时间',
  `headPhoto` varchar(255) NOT NULL COMMENT '头像图片',
  `email` varchar(40) NOT NULL COMMENT '邮箱地址',
  `name` varchar(25) NOT NULL COMMENT '用户真实姓名',
  `tel` varchar(25) NOT NULL COMMENT '用户电话号码',
  `address` varchar(40) NOT NULL COMMENT '用户住址',
  `birthdate` datetime NOT NULL COMMENT '出生年月日',
  `sex` varchar(10) NOT NULL DEFAULT '' COMMENT '性别',
  `house_id` int(11) NOT NULL COMMENT '发布过的房源id',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------

-- ----------------------------
-- Table structure for `comment`
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '评论id',
  `house_id` int(11) NOT NULL COMMENT '房子id（用户可以对任意房子进行评价））',
  `content` varchar(255) NOT NULL COMMENT '评论内容',
  `create_time` datetime NOT NULL COMMENT '评论时间',
  `user_id` int(11) NOT NULL COMMENT '评论者id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------

-- ----------------------------
-- Table structure for `house_photo`
-- ----------------------------
DROP TABLE IF EXISTS `house_photo`;
CREATE TABLE `house_photo` (
  `img` varchar(255) NOT NULL,
  `house_id` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of house_photo
-- ----------------------------

-- ----------------------------
-- Table structure for `house`
-- ----------------------------
DROP TABLE IF EXISTS `house`;
CREATE TABLE `house` (
  `house_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '发布的房源id',
  `province` varchar(15) NOT NULL COMMENT '省份',
  `city` varchar(15) NOT NULL COMMENT '城市',
  `detail_address` varchar(60) NOT NULL COMMENT '详细地址',
  `rent_type` varchar(10) NOT NULL COMMENT '出租类型',
  `rent_people` int(15) NOT NULL COMMENT '宜居人数',
  `house_area` int(100) NOT NULL COMMENT '房屋面积',
  `housetype_shi` int(20) NOT NULL COMMENT '卧室数量',
  `housetype_ting` int(20) NOT NULL COMMENT '客厅数量',
  `housetype_wei` int(20) NOT NULL COMMENT '卫生间数量',
  `housetype_yu` int(20) NOT NULL COMMENT '浴室数量',
  `housetype_chu` int(20) NOT NULL COMMENT '厨房数量',
  `housetype_yt` int(20) NOT NULL COMMENT '阳台数量',
  `housetype_sb` int(20) NOT NULL COMMENT '单人床数量',
  `housetype_db` int(20) NOT NULL COMMENT '双人床数量',
  `house_price` int(100) NOT NULL COMMENT '房屋价格',
  `per_rents` varchar(10) NOT NULL COMMENT '租金单位',
  `begin_time` datetime NOT NULL COMMENT '开始出租时间',
  `end_time` datetime NOT NULL COMMENT '结束出租时间',
  `house_title` varchar(15) NOT NULL COMMENT '房源标题',
  `house_desc` varchar(100) NOT NULL COMMENT '房源描述',
  `pub_time` datetime NOT NULL COMMENT '发布房源的时间',
  `owner_id` int(15) NOT NULL COMMENT '房东id',
  `avaliable_time` varchar(30) NOT NULL COMMENT '可入住时间',
  PRIMARY KEY (`house_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of house
-- ----------------------------

-- ----------------------------
-- Table structure for `reply`
-- ----------------------------
DROP TABLE IF EXISTS `reply`;
CREATE TABLE `reply` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '评论id',
  `content` varchar(255) NOT NULL COMMENT '回复内容',
  `reply_uid` int(11) NOT NULL COMMENT '回复者id',
  `to_id` int(11) NOT NULL COMMENT '目标用户id(给谁回复)',
  `reply_head_photo` varchar(255) NOT NULL COMMENT '评论者的头像',
  `reply_uname` varchar(255) NOT NULL COMMENT '评论者用户名',
  `create_time` datetime NOT NULL COMMENT '回复时间',
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of reply
-- ----------------------------



-- ----------------------------
-- Table structure for `subscribe`
-- ----------------------------
DROP TABLE IF EXISTS `subscribe`;
CREATE TABLE `subscribe` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '预订ID',
  `user_id` varchar(255) NOT NULL COMMENT '用户ID',
  `house_id` varchar(255) NOT NULL COMMENT '预订房间ID',
  `del` int(1) NOT NULL DEFAULT 0  COMMENT '是否删除',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP   COMMENT '预订的时候',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of subscribe
-- ----------------------------


-- ----------------------------
-- Table structure for `feedback`
-- ----------------------------
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id` varchar(255) NOT NULL COMMENT '用户ID',
  `content` varchar(255) NOT NULL COMMENT '内容',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP   COMMENT '创建的时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of feedback
-- ----------------------------



-- ----------------------------
-- Table structure for `wish`
-- ----------------------------
DROP TABLE IF EXISTS `wish`;
CREATE TABLE `wish` (
  `w_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '心愿单id',
  `house_id` int(11) NOT NULL COMMENT '房间id',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建的时间',
  PRIMARY KEY (`w_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wish
-- ----------------------------

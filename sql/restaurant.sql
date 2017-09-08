drop table if exists restaurant_user ;
create table restaurant_user 
(
  username     varchar(25) not null  comment '用户名',
  password     varchar(50) not null comment '用户密码',
  type        int(1) default 1 comment '普通用户 1  超级管理员(可以修改) 2'
)ENGINE=MyISAM CHARSET=utf8mb4 COMMENT '管理员用户';

insert restaurant_user (username,password)values('admin','123456');


drop table if exists restaurant_supermarket;
create table restaurant_supermarket
(
  type                  int  not null COMMENT '超市的id',
  name                  varchar(500) DEFAULT NULL COMMENT '超市名',
  starttime             datetime DEFAULT NULL COMMENT '开始时间',
  endtime               datetime DEFAULT NULL COMMENT '结束时间',
  primary key (type)
)ENGINE=MyISAM CHARSET=utf8mb4 COMMENT '超市列表';
INSERT INTO `restaurant_supermarket` VALUES (1, '华北物美', '2017-7-2 00:00:00', '2017-8-15 23:59:59');
INSERT INTO `restaurant_supermarket` VALUES (2, '银座', '0000-0-0 00:00:00', '2017-9-27 00:00:00');
INSERT INTO `restaurant_supermarket` VALUES (3, '华润万家/乐购', '2017-7-4 00:00:00', '2017-8-19 23:59:59');
INSERT INTO `restaurant_supermarket` VALUES (4, '世纪联华', '2017-7-4 00:00:00', '2017-8-21 23:59:59');
INSERT INTO `restaurant_supermarket` VALUES (5, '永辉', '2017-7-24 00:00:00', '2017-8-22 23:59:59');
INSERT INTO `restaurant_supermarket` VALUES (6, '家乐福', '2017-7-4 00:00:00', '2017-8-22 23:59:59');



drop table if exists restaurant_supermarket_wx_user;
CREATE TABLE `restaurant_supermarket_wx_user` (
   `id` int(11) NOT NULL AUTO_INCREMENT,
   `openid` varchar(30) NOT NULL COMMENT 'openid',
   `awardname` varchar(30) DEFAULT NULL COMMENT '奖品的名称',
   `award_id` int(11) DEFAULT NULL COMMENT '奖品ID',
   `cuisine_type` int(11) DEFAULT NULL COMMENT '菜品ID',
   `username` varchar(30) DEFAULT NULL COMMENT '收货人',
   `ischance`  int(1) NOT NULL DEFAULT 1 COMMENT '是否有抽奖机会 0没有 1有',
   `markettype` int(1) NOT NULL COMMENT '超市类型',
   `mobile` varchar(15) DEFAULT NULL COMMENT '填写的手机号码',
   `area`    varchar(100) DEFAULT NULL COMMENT '收货区域',
   `address` varchar(200) DEFAULT NULL COMMENT '填写的收货地址',
   `identity_card` varchar(30) DEFAULT NULL COMMENT '身份证',
   `url`    varchar(200) DEFAULT NULL COMMENT '填写的URL',
   `cdkey`    varchar(200) DEFAULT NULL COMMENT '激活码',
   `amount` int(5) DEFAULT NULL COMMENT '金额 单位分',
   `type`    enum('entity','virtual','cdkey','redpacket','integral','link') DEFAULT NULL  COMMENT '奖品类型（0：实物，1：电子礼券,2:红包,3：积分，4:兑换码）',
   `isdeal` int(1) DEFAULT 0 COMMENT '是否处理  0 处理 1未处理',
   `remark`     varchar(200) DEFAULT NULL COMMENT '备注消息',
   `lotterytime` datetime DEFAULT NULL COMMENT '抽奖的时间',
   `createtime` datetime DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`),
   KEY `index_award_id` (`award_id`),
   KEY `index_openid` (`openid`),
   KEY `index_ischance` (`ischance`),
   KEY `index_isdeal` (`isdeal`),
   KEY `index_markettype` (`markettype`),
   KEY `index_createtime` (`createtime`),
   UNIQUE KEY `index_openid_markettype` (`openid`,`markettype`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT '抽奖记录';



drop table if exists restaurant_wx_user;
CREATE TABLE `restaurant_wx_user` (
    user_id             int not null auto_increment,
    openid              varchar(30) not null,
    headimgurl          varchar(255),
    nickname            varchar(255),
    sex                 varchar(8),
    city                varchar(255),
    province            varchar(255),
    country             varchar(255),
    cnl                 varchar(255),
    subscribe           int(1) default 0 COMMENT '是否关注',
    createtime          datetime default CURRENT_TIMESTAMP COMMENT '用户进来的时间',
    ip                  varchar(30) NOT NULL COMMENT '用户IP',
    useragent           varchar(255) DEFAULT NULL COMMENT  'User-Agent',
    isblock             int(1) default 0 NOT NULL COMMENT  '是否拉黑',
    primary key (user_id),
    UNIQUE KEY  `index_openid` (`openid`),
    KEY  `index_isblock` (`isblock`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT '微信用户';


DROP TABLE IF EXISTS `restaurant_awards`;
CREATE TABLE `restaurant_awards` (
  `award_id` int(11) NOT NULL COMMENT '奖品id',
  `awardname` varchar(255)  NOT NULL  COMMENT '奖品名称',
  `total_amount` int(11) NOT NULL DEFAULT 0 COMMENT '总数量',
  `rest_amount` int(11) NOT NULL  DEFAULT 0 COMMENT '剩余数量',
  `receive_amount` int(11) NOT NULL DEFAULT 0 COMMENT '接收数量',
  `send_amount` int(11) NOT NULL DEFAULT 0 COMMENT '发放数量',
  `manual_amount` int(11) NOT NULL  DEFAULT 0 COMMENT '人工干预数量',
  `is_manual` int(1) DEFAULT '0'  NOT NULL COMMENT '是否人工干预（0：不干预，1：干预）',
  `type`    enum('entity','virtual','cdkey','redpacket','integral','link') DEFAULT NULL  COMMENT '奖品类型（0：实物，1：电子礼券,2:红包,3：积分，4:兑换码）',
  `rate` int(11) NOT NULL DEFAULT 0 COMMENT '概率份额',
  `markettype` int NOT NULL COMMENT '超市类型',
  KEY `index_type` (`type`) USING BTREE,
  KEY `index_markettype` (`markettype`) USING BTREE,
  KEY `index_award_id` (`award_id`) USING BTREE,
    UNIQUE KEY `index_markettype_award_id` (`markettype`,`award_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT '奖品列表';

-- 
INSERT INTO `restaurant_awards` VALUES (1, '价值4999元的泰国旅游卡',  2,2,0,0,0,0,'virtual',1000,1);
INSERT INTO `restaurant_awards` VALUES (2, '价值399元的拉杆箱',      60000,60000,0,0,0,0,'entity',1000,1);
INSERT INTO `restaurant_awards` VALUES (3, '价值20-30元的立白赠品',  80,80,0,0,0,0,'entity',1000,1);
INSERT INTO `restaurant_awards` VALUES (4, '价值10元的立白赠品',     100,100,0,0,0,0,'entity',1000,1);
-- 
INSERT INTO `restaurant_awards` VALUES (1, '价值4999元的泰国旅游卡',  2,2,0,0,0,0,'virtual',1000,2);
INSERT INTO `restaurant_awards` VALUES (2, '价值399元的拉杆箱',      60000,60000,0,0,0,0,'entity',1000,2);
INSERT INTO `restaurant_awards` VALUES (3, '价值20-30元的立白赠品',  80,80,0,0,0,0,'entity',1000,2);
INSERT INTO `restaurant_awards` VALUES (4, '价值10元的立白赠品',     100,100,0,0,0,0,'entity',1000,2);
-- 
INSERT INTO `restaurant_awards` VALUES (1, '价值4999元的泰国旅游卡',  2,2,0,0,0,0,'virtual',1000,3);
INSERT INTO `restaurant_awards` VALUES (2, '价值399元的拉杆箱',      60000,60000,0,0,0,0,'entity',1000,3);
INSERT INTO `restaurant_awards` VALUES (3, '价值20-30元的立白赠品',  80,80,0,0,0,0,'entity',1000,3);
INSERT INTO `restaurant_awards` VALUES (4, '价值10元的立白赠品',     100,100,0,0,0,0,'entity',1000,3);

-- 
INSERT INTO `restaurant_awards` VALUES (1, '价值4999元的泰国旅游卡',  2,2,0,0,0,0,'virtual',1000,4);
INSERT INTO `restaurant_awards` VALUES (2, '价值399元的拉杆箱',      60000,60000,0,0,0,0,'entity',1000,4);
INSERT INTO `restaurant_awards` VALUES (3, '价值20-30元的立白赠品',  80,80,0,0,0,0,'entity',1000,4);
INSERT INTO `restaurant_awards` VALUES (4, '价值10元的立白赠品',     100,100,0,0,0,0,'entity',1000,4);

-- 
INSERT INTO `restaurant_awards` VALUES (1, '价值4999元的泰国旅游卡',  2,2,0,0,0,0,'virtual',1000,5);
INSERT INTO `restaurant_awards` VALUES (2, '价值399元的拉杆箱',      60000,60000,0,0,0,0,'entity',1000,5);
INSERT INTO `restaurant_awards` VALUES (3, '价值20-30元的立白赠品',  80,80,0,0,0,0,'entity',1000,5);
INSERT INTO `restaurant_awards` VALUES (4, '价值10元的立白赠品',     100,100,0,0,0,0,'entity',1000,5);

--
INSERT INTO `restaurant_awards` VALUES (1, '价值4999元的泰国旅游卡',  2,2,0,0,0,0,'virtual',1000,6);
INSERT INTO `restaurant_awards` VALUES (2, '价值399元的拉杆箱',      60000,60000,0,0,0,0,'entity',1000,6);
INSERT INTO `restaurant_awards` VALUES (3, '价值20-30元的立白赠品',  80,80,0,0,0,0,'entity',1000,6);
INSERT INTO `restaurant_awards` VALUES (4, '价值10元的立白赠品',     100,100,0,0,0,0,'entity',1000,6);
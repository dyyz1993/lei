/**
 * @Author: yingzhou xu
 * @Date:   2017-08-07T16:05:15+08:00
 * @Email:  dyyz1993@qq.com
 * @Filename: ihome.sql
 * @Last modified by:   yingzhou xu
 * @Last modified time: 2017-08-12T10:30:27+08:00
 */

drop table if exists base_wx_user;
create table base_wx_user
(
  id                  int  auto_increment not null,
  openid              varchar(35) not null,
  headimgurl          varchar(255),
  nickname            varchar(255),
  sex                 varchar(8),
  city                varchar(255),
  province            varchar(255),
  country             varchar(255),
  subscribe           int(1) default 0 COMMENT '是否关注',
  subscribe_time       datetime default CURRENT_TIMESTAMP COMMENT '关注时间',
  isblock             int(1) default 0  comment '是否拉黑 0未拉黑 1拉黑',
  createtime          datetime default CURRENT_TIMESTAMP COMMENT '创建时间',
  primary key (id),
  UNIQUE KEY `index_openid` (`openid`) USING BTREE comment '用户openid'
) ENGINE=InnoDB CHARSET=utf8mb4 COMMENT '投票者';





drop table if exists base_user;
create table base_user
(
  username     varchar(25) not null  comment '用户名',
  password     varchar(50) not null comment '用户密码',
  type        int(1) default 1 comment '普通用户 1  超级管理员(可以修改) 2',
  primary key (username)
)ENGINE=InnoDB CHARSET=utf8mb4 COMMENT '管理员用户';
insert base_user (username,password)values('admin','123456');

[参考](https://juejin.cn/post/7007346707767754765?utm_source=gold_browser_extension#heading-18)

## 基本命令

- 安装

```shell
yum install nginx
```

- 查看版本号


```shell
nginx -v
nginx -V ## 查询版本及配置
```

- 重启nginx

```shell
nginx -s reload
```

- 验证配置是否正确

```shell
 ./nginx -t
```

- Nginx正常启动：

```shell
nginx
```

- 快速停止或关闭Nginx

```shell
./nginx -s stop
```

- 正常停止或关闭Nginx

```shell
./nginx -s quit
```

- 配置文件修改重装载命令


```shell
./nginx -s reload
```

## 基本配置

### Docker 容器中的Nginx配置Demo

```nginx
user  nginx;

worker_processes  auto;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    access_log  /var/log/nginx/access.log;

    #配置了多个server的时候，一定要设置该参数
    server_names_hash_bucket_size 64;

    #处理请求request_line/request_header缓存大小，首先根据client_header_buffer_size分配大小，大小超出后会根据large_client_header_buffers分配大小
    #所以基本client_header_buffer_size用来应对小的request_line/request_header，large_client_header_buffers应对大的请求
    #如果http主配置没有设置，在server中配置的话，需要设置listen 80 default_server;默认服务，因为在处理请求头信息的时候，还没解析到server去，直接从默认服务取值
    client_header_buffer_size 32k;
    large_client_header_buffers 4 32k;

    #设置请求主体内存大小，文件上传很容易受影响
    client_max_body_size 50m;

    #开启高效传输文件模式
    sendfile    on;

    #优化带宽利用率
    tcp_nopush  on;
    tcp_nodelay on;

    #大文件传输的时候，需要兼顾，太大的话，普通请求完成了又不释放http连接，占用worker_connections，worker_connections达到上限后会宕机
    keepalive_timeout  60;

    #优化fastcgi
    fastcgi_connect_timeout 60;
    fastcgi_send_timeout 60;
    fastcgi_read_timeout 60;
    fastcgi_buffer_size 4k;
    fastcgi_buffers 8 4k;
    fastcgi_busy_buffers_size 8k;
    fastcgi_temp_file_write_size 256k;

    #server
    #{
    #    listen 80 default;
    #    return 403;
    #}
  	# 加载/etc/nginx/conf.d/下的所有配置
    include /etc/nginx/conf.d/*.conf;
}
```

#### default.conf

/etc/nginx/conf.d/default.conf内容
```nginx
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```

### 完整的配置说明

#### 目录结构


```nginx
|—— nginx.conf                       # 配置入口文件
├── conf.d                           # 放置所有的配置
│   ├── default.conf                 # http配置，通过307定向到https
│   ├── default_ssl.conf             # https配置
│   ├── ...                          # 更多的配置...
```

#### nginx.conf

```nginx

user root;

# 设置工作进程的数量
worker_processes  1;

error_log /var/log/nginx/error.log;
pid        /run/nginx.pid;
include /usr/share/nginx/modules/*.conf;

events {
    #==最大连接数，一般设置为cpu*2048
    worker_connections  1024;
}

http {
    # 文件拓展名查找集合
    include /etc/nginx/mime.types;
    # 当查找不到对应类型的时候默认值
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    '$status $body_bytes_sent "$http_referer" '
    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    # 调用 sendfile 系统传输文件
    sendfile        on;
    #tcp_nopush     on;

    # ==客户端链接超时时间
    # keepalive_timeout  0;
    keepalive_timeout  65;

    # 开启gzip 压缩
    gzip on;
    # 设置gzip所需的http协议最低版本 （HTTP/1.1, HTTP/1.0）
    gzip_http_version 1.1;
    # 设置压缩级别，压缩级别越高压缩时间越长  （1-9）
    gzip_comp_level 4;
    # 设置压缩的最小字节数， 页面Content-Length获取
    gzip_min_length 1000;
    # 设置压缩文件的类型  （text/html)
    gzip_types text/plain application/javascript text/css;


    # 加载/etc/nginx/conf.d/下的所有配置
    include /etc/nginx/conf.d/*.conf;
}

```

#### default.conf

```nginx
server {
    #站点监听端口
    listen       80 default_server;
    listen       [::]:80 default_server;    #站点访问域名
    server_name  forguo.cn www.forguo.cn;

    #编码格式，避免url参数乱码
    charset utf-8;

    # 重定向到https
    location / {
        #location用来匹配同一域名下多个URI的访问规则
        #比如动态资源如何跳转，静态资源如何跳转等
        #location后面跟着的/代表匹配规则
        return 307 https://forguo.cn/$request_uri;
    }
}

```

#### default_ssl.conf

```nginx
server {
    listen       443 ssl;
    server_name  forguo.cn www.forguo.cn;

    ssl_certificate      forguo.cn.crt;
    ssl_certificate_key  forguo.cn.key;

    ssl_session_cache    shared:SSL:10m;
    ssl_session_timeout  10m;

    ssl_ciphers     EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
    ssl_prefer_server_ciphers  on;

    location / {
        #站点根目录，可以是相对路径，也可以使绝对路径
        root   /root/www/;

        #默认首页文件
        index  index.html index.htm;
        # 如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面
        try_files $uri $uri/ /index.html;

        #拒绝请求，返回403，一般用于某些目录禁止访问
        #deny all;

        #允许请求
        #allow all;

        # CORS
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Credentials' 'true';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type';
    }
    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root html;
    }

    # 转发api到node服务
    
    location /api/ {
        proxy_pass   http://127.0.0.1:3333/api/;
    }

    # 开启目录浏览功能
    location /brower/ {
        charset utf-8;
    	# 浏览/root/www/brower/ 目录，只需要配置上一级即可
        root /root/www/;
        # alias /root/www/;
        autoindex on;
        # 开启目录浏览功能；
        autoindex_exact_size off;
        # 关闭详细文件大小统计，让文件大小显示MB，GB单位，默认为b；
        autoindex_localtime on;
        # 开启以服务器本地时区显示文件修改日期！
    }
}

```

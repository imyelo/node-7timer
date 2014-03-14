全天云量: <%= cloudcover %>
大气宁视度: <%= seeing %>
大气透明度: <%= transparency %>
地面气温: <%= temp2m %>℃
地面相对湿度: <%= rh2m %>%
降雨/降雪: <%= {none: '无', 'snow': '雪', 'rain': '雨'}[prec_type] %>
风向: <%= {NE: '东北', 'NW': '西北', 'SE': '东南', 'SW': '西南', 'N': '北', 'E': '东', 'S': '南', 'W': '西'}[wind10m.direction] %>
风速: <%= wind10m.speed %>
---
# create lunr store for search page 
---
{% if site.data.theme.search-child-objects == true %}
  {%- assign items = site.data[site.metadata] | where_exp: 'item','item.objectid' -%}
{% else %}
  {%- assign items = site.data[site.metadata] | where_exp: 'item','item.objectid' | where_exp: 'item','item.parentid == nil' -%}
{% endif %}
{%- assign fields = site.data.config-search -%}
var store =[{%- for item in items -%}
    {
        "id": {{ item.objectid | jsonify }},
        {% for f in fields %}
            {{ f.field | jsonify }}: {% if item[f.field] %}
                {{ item[f.field] | normalize_whitespace | replace: '""','"' | jsonify }}
            {% else %}
                "none" 
            {% endif %}{% unless forloop.last %},
        {% endunless %}{% endfor %},
        {% for f in fields %}
            {{ f.display_name | jsonify }}: {% if item[f.display_name] %}
                {{ item[f.display_name] | normalize_whitespace | replace: '""','"' | jsonify }}
            {% else %}
                "none" 
        {% endif %}{% unless forloop.last %},
    }
{%- unless forloop.last -%},{%- endunless -%}{%- endfor -%}];
const svg_def = "http://www.w3.org/2000/svg";

function is_small(size) {
  return size < 16;
}

function is_big(size) {
  return size >= 30;
}

function is_giant(size) {
  return size > 60;
}

function interp(size, from, to) {
  const start = 10;
  const end = 20;
  if (size <= start) {
    return from;
  } else if (size >= end) {
    return to;
  } else {  
    return from + (size-start)*(to-from)/(end-start);
  }
}

function gap(n, gap) {
  if (typeof gap === 'undefined' ) {
    gap = 1;
  }
  return (n <= gap) ? gap : n;
}

function create_path(p, fill, thickness) {
  var outline = document.createElementNS(svg_def, "path");
  var path = '';
  p.forEach(function(point) {
    var x = point[1] + 0.5;
    var y = point[2] + 0.5;
    path += point[0] + x + ',' + y + ' ';
  }) ;

  outline.setAttribute("d", path);
  

  if (typeof fill === 'undefined') {
    outline.setAttribute("fill", 'none');
  } else {
    outline.setAttribute("fill", fill);
  }
  outline.setAttribute('stroke', "#000");
  if (typeof thickness === 'undefined') {
    thickness = 1;
  }
  outline.setAttribute("stroke-width", thickness);
  outline.setAttribute("stroke-linecap", "round")
  outline.setAttribute("stroke-linejoin", "round")

  outline.setAttribute("class", "icon")

  return outline;

}


function create_circle(x, y, r, fill) {
  var outline = document.createElementNS(svg_def, "circle");
  x = x + 0.5;
  y = y + 0.5;
  
  outline.setAttribute("cx", x);
  outline.setAttribute("cy", y);
  outline.setAttribute("r", r);

  
  if (typeof fill === 'undefined') {
    outline.setAttribute("fill", 'none');
  } else {
    outline.setAttribute("fill", fill);
  }
  
  outline.setAttribute('stroke', "#000");
  outline.setAttribute('stroke-width', 1);    

  outline.setAttribute("class", "icon")

  return outline;

}


function paint_camera(svg, size) {
    var s = Math.floor(size) - 1;
    var top = Math.ceil(interp(s, 0.175, 0.4)*s);
    var bottom = s; Math.ceil(interp(s, 0.925, 0.85)*s);
    var top2 = top + Math.round(s/15);

    var lense_r = 0.2*s;
    var m_x = 0.6*s;
    var m_y = bottom - gap(lense_r*1.3, 1.75+lense_r);
    
    // lense outline
    if (s > 15) {
      svg.appendChild(create_circle(m_x, m_y, lense_r, 'none'));
    } else {
      svg.appendChild(create_circle(s*0.55, top*0.45+bottom*0.55, lense_r, '#000'));      
    }

    svg.appendChild(create_path([
        ["M", 0, top2],
        ["L", Math.round(s/3), top2],
        ["L", Math.round(s/3), top],
        ["L", s, top],
        ["L", s, bottom],
        ["L", 0, bottom],
        ["L", 0, top2],       
      ], 'none'));

    if (s > 7) {
      // trigger
      svg.appendChild(create_path([
          ["M", Math.round(s*0.05), top2],
          ["L", Math.round(s*0.05), top],
          ["L", Math.round(s*0.125), top],
          ["L", Math.round(s*0.125), top2],
        ], 'none'));
      svg.appendChild(create_path([
          ["M", Math.round(s*0.175), top2],
          ["L", Math.round(s*0.175), Math.round(top2*0.3 + top*0.7)],
          ["L", Math.round(s*0.275), Math.round(top2*0.3 + top*0.7)],
          ["L", Math.round(s*0.275), top2],
        ], 'none'));
    }

    var a = Math.round(m_y - lense_r *0.75);
    var b = Math.floor(m_y + lense_r);
    var c = Math.floor(m_x - lense_r*1.25);
    var d = Math.ceil(m_x + lense_r*1.25)

    // grip
    if (s > 18 ) {
      // grip
      svg.appendChild(create_path([
          ["M", 0, a],
          ["L", c, a],
      ], 'none'));
      svg.appendChild(create_path([
          ["M", 0, b],
          ["L", c, b],
      ], 'none'));
      svg.appendChild(create_path([
          ["M", s, a],
          ["L", d, a],
      ], 'none'));
      svg.appendChild(create_path([
          ["M", s, b],
          ["L", d, b],
      ], 'none'));
    }

    if (s > 55) {
      svg.appendChild(create_path([
          ["M", 2, a + 4],
          ["L", 2, b - 4],
      ], 'none', 0.5));
      svg.appendChild(create_path([
          ["M", s-2, a + 4],
          ["L", s-2, b - 4],
      ], 'none', 0.5));
    }

    if (s > 65) {
      svg.appendChild(create_path([
          ["M", 4, a + 4],
          ["L", 4, b - 4],
      ], 'none', 0.5));
      svg.appendChild(create_path([
          ["M", s-4, a + 4],
          ["L", s-4, b - 4],
      ], 'none', 0.5));
    }
    // viewfinder
    if (s > 27) {    
      a = gap(Math.round(s/6),3);
      b = gap(Math.round(s/9), 3);
      svg.appendChild(create_path([
          ["M", s-2, top+2],
          ["L", s-a, top+2],
          ["L", s-a, top+b],
          ["L", s-2, top+b],
          ["L", s-2, top+2],
      ], 'none'));
    }
    if (size > 40) {
        // lense details
      svg.appendChild(create_circle(m_x, m_y, lense_r*0.75, 'none'));
    }

}


function paint_file(svg, size) {
    var s = Math.floor(size) - 1;
    var a = 0;
    var b = Math.ceil(s - s*(1 - 5/7));

    c = Math.ceil(s * interp(s, 0.3, 0.2))
    svg.appendChild(create_path([
        ["M", a, 0],
        ["L", b-c, 0],
        ["L", b, c],
        ["L", b, s],
        ["L", a, s],
        ["L", a, 0],      
    ], 'none'));
    svg.appendChild(create_path([
        ["M", b-c, 0],
        ["L", b-c, c],
        ["L", b, c],     
    ], 'none'));

    if (size > 10) {
      a = a + gap(Math.round(s/8), 3);
      var d = b - gap(Math.round(s/8), 3);

      var i;
      var short = true;
      for (i = Math.ceil(s/4); i < s*0.85; i += Math.round(s/8) + 3) {
        svg.appendChild(create_path([
            ["M", a, i],
            ["L", d - gap(Math.round(s/10), c + (d-b) + 2) * short, i],
        ], 'none'));
        short = !short;
      }
 
    }
}

function paint_clock(svg, size) {
    var s = Math.floor(size) - 1;
    var m = Math.floor(s / 2);
    var r = Math.floor(m)-1;
    var hand_x_hour = gap(r-1) * Math.sin(Math.PI*0.32) * 0.6;
    var hand_y_hour = gap(r-1) * Math.sin(Math.PI*0.18) * 0.6;

    var hand_x_min = gap(r-1) * Math.sin(Math.PI/3) * 0.8;
    var hand_y_min = gap(r-1) * Math.sin(Math.PI/6) * 0.8;

    var hour_mark_len1 = gap(Math.round(s/ 20));
    var hour_mark_len2 = gap(Math.round(s/ 10), hour_mark_len1 + 1);




    svg.appendChild(create_circle(m, m, r, 'none'));

    svg.appendChild(create_path([
        ["M", m - hand_x_hour, m - hand_y_hour],
        ["L", m, m],
        ["L", m + hand_x_min, m - hand_y_min],     
    ], 'none'));

    if (is_big(size)) {
      svg.appendChild(create_path([
          ["M", m - r + hour_mark_len1 , m],
          ["L", m - r + hour_mark_len2, m],
      ], 'none'));
      svg.appendChild(create_path([
          ["M", m, m - r + hour_mark_len1],
          ["L", m, m - r + hour_mark_len2],
      ], 'none'));
      svg.appendChild(create_path([
          ["M", m + r - hour_mark_len1 , m],
          ["L", m + r - hour_mark_len2, m],
      ], 'none'));
      svg.appendChild(create_path([
          ["M", m, m + r - hour_mark_len1],
          ["L", m, m + r - hour_mark_len2],
      ], 'none'));
      svg.appendChild(create_circle(m, m, 1, '#000')); 
    }

    if (s > 40) {
      var i;
      for (i = 0; i < Math.PI*2; i += Math.PI/6) {
        svg.appendChild(create_path([
            ["M", m + (r - hour_mark_len1) * Math.cos(i), m + (r - hour_mark_len1) * Math.sin(i)],
            ["L", m + (r - hour_mark_len1 - 1) * Math.cos(i), m + (r - hour_mark_len1 - 1) * Math.sin(i)],
        ], 'none'));
      }
      svg.appendChild(create_path([
          ["M", m, m],
          ["L", m, m+r-hour_mark_len2],
      ], 'none', 0.5));
    }
}



function debug_draw(size, f, id) {
  var svgElement = document.createElementNS(svg_def, "svg");
  svgElement.setAttribute("width", size);
  svgElement.setAttribute("height", size);
  document.getElementById(id).appendChild(svgElement);   
  f(svgElement, size)

}


r(function(){

  function shrink(n) {
    return n * 0.8 -3;
  }

  var i;
  for (i=80; i > 5; i = shrink(i) ) {
    debug_draw(i, paint_clock, 'clock');
  }
  for (i=80; i > 5; i = shrink(i)) {
    debug_draw(i, paint_camera, 'camera');
  }
  for (i=80; i > 5; i = shrink(i)) {
    debug_draw(i, paint_file, 'file');
  }


});


function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}

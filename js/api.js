const base_url = "https://api.football-data.org/v2/";
const API_KEY = "58bb5862db264a788829b31b0e69595d";
const fetchApi = function (url) {
  return fetch(url, {
    headers: {
      'X-Auth-Token': API_KEY
    }
  });
};

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getTopSkor() {

  if ("caches" in window) {
    caches.match(base_url + 'competitions/2014/scorers/').then(function (response) {
      if (response) {
        response.json().then(function (data) {
          dataSkor = data;
          console.log(data);
          // Objek/array JavaScript dari response.json() masuk lewat data.
          // Menyusun komponen card artikel secara dinamis
          var skorHTML = '';
          var i = 0;
          var detailSkor = '';
          data.scorers.forEach(function (scorers) {
            detailSkor += `
          <tr>
            <td>${i+=1}</td>
            <td>${scorers.player.name}</td>
            <td>${scorers.team.name}</td>
            <td>${scorers.player.nationality}</td>
            <td>${scorers.player.position}</td>
            <td>${scorers.numberOfGoals}</td>
          <tr>
        `;
          })

          skorHTML += `
        <div class="col s12 m12">
        <div class="card">
        <div class="card-content">
        <h3>Top Skor</h3>
        <table class = "responsive-table striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Team</th>
            <th>Kebangsaan</th>
            <th>Posisi</th>
            <th>Jumlah Goals</th>
          </tr>
        </thead>

        <tbody>` + detailSkor + `</tbody>
        </table>
        </div>
        </div>
        </div>
      `;
          document.getElementById("body-content").innerHTML = skorHTML;
        })
      }
    })
  }

  fetchApi(base_url + 'competitions/2014/scorers/')
    .then(status)
    .then(json)
    .then(function (data) {
      dataSkor = data;
      console.log(data);
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      var skorHTML = '';
      var i = 0;
      var detailSkor = '';
      data.scorers.forEach(function (scorers) {
        detailSkor += `
          <tr>
            <td>${i+=1}</td>
            <td>${scorers.player.name}</td>
            <td>${scorers.team.name}</td>
            <td>${scorers.player.nationality}</td>
            <td>${scorers.player.position}</td>
            <td>${scorers.numberOfGoals}</td>
          <tr>
        `;
      })

      skorHTML += `
        <div class="col s12 m12">
        <div class="card">
        <div class="card-content">
        <h3>Top Skor</h3>
        <table class = "responsive-table striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Team</th>
            <th>Kebangsaan</th>
            <th>Posisi</th>
            <th>Jumlah Goals</th>
          </tr>
        </thead>

        <tbody>` + detailSkor + `</tbody>
        </table>
        </div>
        </div>
        </div>
      `;
      document.getElementById("body-content").innerHTML = skorHTML;
    })
    .catch(error);
}
// Blok kode untuk melakukan request data json
function getTeams() {
  if ("caches" in window) {
    caches.match(base_url + 'teams/').then(function (response) {
      if (response) {
        response.json().then(function (data) {
          var articlesHTML = "";
          var url = "";
          data.teams.forEach(function (article) {
            if (article.crestUrl === null) {
              url = "default.png"
            } else {
              url = article.crestUrl.replace(/^http:\/\//i, 'https://')
            }
            articlesHTML += `
            <div class="card col s12 m6 l3">
            <span class="card-title truncate center">${article.name}</span>
              <a href="./detailteam.html?id=${article.id}">
                <div class="card-image waves-effect waves-block waves-light">
                  <img src="${url}" alt="Gambar Tidak Ditemukan" width="20px" height="240px"/>
                </div>
              </a>
              <div class="card-content">
                <p>${article.area.name}</p>
              </div>
            </div>
          `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("teams").innerHTML = articlesHTML;
        })
      }
    })
  }

  fetchApi(base_url + 'teams/')
    .then(status)
    .then(json)
    .then(function (data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      var articlesHTML = "";
      var url = "";
      data.teams.forEach(function (article) {
        if (article.crestUrl === null) {
          url = "default.png"
        } else {
          url = article.crestUrl.replace(/^http:\/\//i, 'https://')
        }
        articlesHTML += `
              <div class="card col s12 m6 l3">
              <span class="card-title truncate center">${article.name}</span>
                <a href="./detailteam.html?id=${article.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${url}" alt="Gambar Tidak Ditemukan" width="20px" height="240px"/>
                  </div>
                </a>
                <div class="card-content">
                  <p>${article.area.name}</p>
                </div>
              </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("teams").innerHTML = articlesHTML;
    })
    .catch(error);
}

function getTeamsById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            var url = "";
            if (data.crestUrl === null) {
              url = "default.png"
            } else {
              url = data.crestUrl.replace(/^http:\/\//i, 'https://')
            }
            var articleHTML = `
            <h2 class="card-title center">${data.name}</h2>
                <div class="card horizontal col s3 m3 l3">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${url}" alt="Gambar Tidak Ditemukan" />
                  </div>
                  <div class="card-content">
                  
                    <p>Nationality : ${data.area.name}</p>
                    <p>Address     : ${data.address}</p>
                    <p>Phone       : ${data.phone}</p>
                    <p>Website     : ${data.website}</p>
                    <p>Email       : ${data.email}</p>
                    <p>Founded     : ${data.founded}</p>
                    <p>Club Colors : ${data.clubColors}</p>
                    <p>Venue       : ${data.venue}</p>
                  </div>
                </div>
              `;
            document.getElementById("body-content").innerHTML = articleHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetchApi(base_url + "teams/" + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        var url = "";
        if (data.crestUrl === null) {
          url = "default.png"
        } else {
          url = data.crestUrl.replace(/^http:\/\//i, 'https://')
        }
        var articleHTML = `
        <h2 class="card-title center">${data.name}</h2>
            <div class="card horizontal col s3 m3 l3">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${url}" alt="Gambar Tidak Ditemukan" />
              </div>
              <div class="card-content">
              
                <p>Nationality : ${data.area.name}</p>
                <p>Address     : ${data.address}</p>
                <p>Phone       : ${data.phone}</p>
                <p>Website     : ${data.website}</p>
                <p>Email       : ${data.email}</p>
                <p>Founded     : ${data.founded}</p>
                <p>Club Colors : ${data.clubColors}</p>
                <p>Venue       : ${data.venue}</p>
              </div>
            </div>
          `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = articleHTML;
        resolve(data);
      });
  });
}

function getSavedTeams() {
  getAll().then(function (articles) {
    console.log(articles);
    // Menyusun komponen card artikel secara dinamis
    var articlesHTML = "";
    var url = "";
    articles.forEach(function (article) {

      if (article.crestUrl === null) {
        url = "default.png"
      } else {
        url = article.crestUrl.replace(/^http:\/\//i, 'https://')
      }
      articlesHTML += `
                  <div class="card col s12 m6 l6">
                  <span class="card-title truncate center">${article.name}</span>
                  <a href="./detailteam.html?id=${article.id}&saved=true">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${url}" alt="Gambar Tidak Ditemukan" width="512px" height="412px"/>
                      </div>
                    </a>
                    <div class="card-content center">
                    <p>${article.area.name}</p>
                    <p>${article.phone}</p>
                    <p>${article.website}</p>
                    <p>${article.email}</p>
                    </div>
                  </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("saved").innerHTML = articlesHTML;
  });
}

function getSavedTeamsById() {
  return new Promise(function (resolve, reject) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    var url = "";
    getById(idParam).then(function (data) {
      console.log(data);
      articleHTML = '';
      if (data.crestUrl === null) {
        url = "default.png"
      } else {
        url = data.crestUrl.replace(/^http:\/\//i, 'https://')
      }
      var articleHTML = `
    <h2 class="card-title center">${data.name}</h2>
        <div class="card horizontal col s3 m3 l3">
          <div class="card-image waves-effect waves-block waves-light">
            <img src="${url}" alt="Gambar Tidak Ditemukan" />
          </div>
          <div class="card-content">
          
            <p>Nationality : ${data.area.name}</p>
            <p>Address     : ${data.address}</p>
            <p>Phone       : ${data.phone}</p>
            <p>Website     : ${data.website}</p>
            <p>Email       : ${data.email}</p>
            <p>Founded     : ${data.founded}</p>
            <p>Club Colors : ${data.clubColors}</p>
            <p>Venue       : ${data.venue}</p>
          </div>
        </div>
      `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = articleHTML;
      resolve(data);
    });
  });
}
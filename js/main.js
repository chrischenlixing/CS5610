function MainModule(listingsID = "#listings") {
  const me = {};


  const listingsElement = document.querySelector(listingsID);

  function getAmenitiesList(listing) {
    const amenitiesArray = JSON.parse(listing.amenities);
    let listItems = "";
    amenitiesArray.forEach(amenity => {
      listItems += `<li>${amenity}</li>`;
    });
    return `<ul>${listItems}</ul>`;
  }


  function getListingCode(listing) {
    const amenitiesHTML = getAmenitiesList(listing);

    return `<div class="listing col-4">
  <div class="card">

    <img
        class="img card-img-top"
        src="${listing.picture_url}"
        alt="Listing 1 Picture"
      />

    <h2 class="listing_name card-title name">
      <a href="${listing.listing_url}">
        ${listing.name}
      </a>
    </h2>
    <div class="ellipsis-text description">${listing.description}</div>
    <div class="price"><strong>price: </strong><em>${listing.price}</em></div>
    <div class="card-body pt0">
      <div class="host">
        <div class="host-left">
          <a href="${listing.host_url}">
            <img
            src="${listing.host_picture_url}"
            alt="Host Thumbnail"
            />
          </a>
          
        </div>
        <div class="host-right">
          <div class="host_name"><a href="${listing.host_url}">${listing.host_name}</a></div>
        </div>
      </div>
      <h3>Amenities</h3>
      <div class="amenities">
        ${amenitiesHTML}
      </div>
    </div>
  </div>
  <!-- /.card -->
</div>
<!-- /.listing -->`;
  }

  

  function redraw(listings) {
    listingsElement.innerHTML = "";
    listingsElement.innerHTML = listings.map(getListingCode).join("\n");
  }

  async function loadData() {
    const res = await fetch("./airbnb_sf_listings_500.json");
    const listings = await res.json();


    me.redraw(listings.slice(0, 50));
  }

  me.redraw = redraw;
  me.loadData = loadData;

  return me;
}

const main = MainModule();


main.loadData();
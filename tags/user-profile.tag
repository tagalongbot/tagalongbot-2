<user-profile>
  <!-- Use Materialize CSS -->
  <div class="row">
    <div class="col s12 m7">
      <div class="card">
        <div class="card-image">
          <img src="{ opts.person.profile_image_url }">
          <span class="card-title">{ opts.person.first_name } { opts.person.last_name }</span>
        </div>
        <div class="card-content">
          <span>Gender: { opts.person.gender }</span>
          <br>
          <span>Activities: { opts.person.interests }</span>
        </div>
      </div>
    </div>
  </div>
</user-profile>
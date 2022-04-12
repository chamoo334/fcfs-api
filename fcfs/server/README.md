## Backend Readme

<details>
    <summary> General Structure</summary>
    <ul style="list-style-type:none;">
        <li>
            <details>
                <summary> config</summary>
                <ul style="list-style-type:none;">
                    <li>db.js</li>
                    <li>blank.env</li>
                </ul>
            </details>
        </li>
        <li>
            <details>
                <summary>controllers</summary>
                <ul style="list-style-type:none;">
                    <li>
                        <details>
                            <summary>v1</summary>
                            <ul style="list-style-type:none;">
                                <li>auth.js</li>
                                <li>campgrounds.js</li>
                                <li>users.js</li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </details>
        </li>
        <li>
            <details>
                <summary>middleware</summary>
                <ul style="list-style-type:none;">
                    <li>async.js</li>
                    <li>auth.js</li>
                    <li>error.js</li>
                    <li>generalQuery.js</li>
                    <li>xssCleanIn.js</li>
                </ul>
            </details>
        </li>
        <li>
            <details>
                <summary>models</summary>
                <ul style="list-style-type:none;">
                    <li>
                        <details>
                            <summary>__tests__</summary>
                            <ul style="list-style-type:none;">
                                <li>State.test.js</li>
                                <li></li>
                            </ul>
                        </details>
                    </li>
                    <li>Campground.js</li>
                    <li>Parks.js</li>
                    <li>Photo.js</li>
                    <li>State.js</li>
                    <li>User.js</li>
                </ul>
            </details>
        </li>
        <li>
            <details>
                <summary>public</summary>
                <ul style="list-style-type:none;">
                    <li>
                        <details>
                            <summary>uploads</summary>
                            <ul style="list-style-type:none;">
                                <li>photo-camp-no-photo.jpg</li>
                                <li>photo-user-no-photo.jpg</li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </details>
        </li>
        <li>
            <details>
                <summary>routes</summary>
                <ul style="list-style-type:none;">
                    <li>
                        <details>
                            <summary>v1</summary>
                            <ul style="list-style-type:none;">
                                <li>auth.js</li>
                                <li>campground.js</li>
                                <li>users.js</li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </details>
        </li>
        <li>
            <details>
                <summary>utils</summary>
                <ul style="list-style-type:none;">
                    <li>ErrorResponse.js</li>
                    <li>geocoder.js</li>
                    <li>sendEmail.js</li>
                </ul>
            </details>
        </li>
        <li>.babelrc</li>
        <li>app.js</li>
        <li>app.test.js</li>
        <li>server.js</li>
    </ul>
</details>

<details>
<summary> ERD</summary>

The image below represents the structure of data as received by a user.
![Received Data ERD](../../git_img/erd-received-data.png)

</details>

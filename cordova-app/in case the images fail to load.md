# In case the images fail to load

Add `homepage` property inside `package.json`:

``` json
{
	// ...
    "homepage": "./"
	// ...
}
```


For the JSX, use this format:

``` jsx
<img src="./path_to_image/image.png" alt="" />
```

The images are inside the `public` folder.

The path is relative to `index.html`.

## Example Case

Consider this directory structure:

``` txt
 - node_modules
 - public
   - assets
     - images
       - cat.jpg
 - src
```

Now let's get "cat.jpg" and load it to the UI.

``` jsx
<img src="./assets/images/cat.jpg" alt="cat" />
```
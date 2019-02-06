# Google Maps Marker Clustering with Angular JS (v 1.2)

This app integrates:
- Google Maps JS
- Google Places Library
- Google Marker Clustering Library v3
- Angular JS v 1.2

![](https://i.imgur.com/DMu5nOp.png)

### When cursor is over one of the elements from the list, Places API searchs it and updates Maps
![](https://media.giphy.com/media/4QERff6mPqXBKzaLB8/giphy.gif)

## To run the app properly you must:

Create a 'config.js' file in /js folder using your GOOGLE_API_KEY:

```
myApp.constant('GOOGLE_API_KEY', 'YOUR_API_KEY');
```

Have a HTTP server running locally. In my case I've used Ruby simple_http_server. This is the ALIAS that I've added in my '~/.zshrc' file to simplify things:

```
alias simple_http_server="ruby -run -e httpd -- -p 5000 ."
```

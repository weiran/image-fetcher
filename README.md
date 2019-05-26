# Image Extractor

A node app that transforms a URL into a redirect to the main image from the web page.

## Usage

There is a single endpoint at the root which accepts a `GET` request with a URL parameter named `url`. This will return either:

* `301` redirect to the target image
* `404` if:
  * no image was found
  * the URL didn't return HTML
  * the URL couldn't be resolved

## Hackers

Built for and used in [Hackers](https://github.com/weiran/Hackers).

---
<p align="center">
  <b>By Weiran Zhang</b><br>
  <a href="https://weiran.co">Website</a> |
  <a href="https://twitter.com/weiran">Twitter</a> |
  <a href="https://github.com/weiran">GitHub</a>
</p>

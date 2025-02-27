# Cross-Roads
*Where will you go next?*

### [Tool link](https://clement-gouin.github.io/cross-roads/)

## Data format

Format is made line by line

Header (1 line):
```txt
1   Title and description (html, <h1> on plain text)
```

After that each link is defined as follows:
```txt
1   Link
2   Label (html)
```

## Samples

```txt
Where to find me
https://www.youtube.com/watch?v=dQw4w9WgXcQ
🎥 | My Youtube Channel
https://www.instagram.com/officialrickastley
📷 | My Instagram Profile
https://open.spotify.com/artist/0gxyHStUsqpMadRV0Di1Qt
🎵 | My Spotify
```

```txt
<h1><i icon=hand></i> Your choice <i icon=hand></i></h1><img src="https://external-preview.redd.it/C84ufieQl-aIoR4PrmEGpAEoT81zMhTr7UqG6_66XVM.jpg?auto=webp&s=652ab6f0854cc2e7375fe34c9944a650a46b08a4" />
https://www.nyan.cat/index.php?cat=tacnayn
<span class="red"><b><i icon=pill></i></b> Take the red pill</span>
https://www.nyan.cat/index.php?cat=original
<span class="blue"><b><i icon=pill></i></b> Take the blue pill</span>
```

## Tips

* [Material design colors](https://materialui.co/colors/) are available, you can use `class="red-500"` on your HTML
* [Lucide icons](https://lucide.dev/icons) are available, you can use `<i icon=house></i>` on your HTML
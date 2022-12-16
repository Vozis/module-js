const a = 9

loadScript("js/common.js", () => { 
    loadScript("js/common2.js",
        () => { console.log("timer.js ")
    })
})
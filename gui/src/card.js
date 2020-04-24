import Widget from "./widget"

export default class Card extends Widget
{
    constructor(title, content)
    {
        // i wish i used react for this
        super("card");

        // header //
        this.header = document.createElement("div");
        this.header.className = "header";
        this.appendChild(this.header);
        
        this.checkBox = document.createElement("input");
        this.checkBox.type = "checkbox";
        this.checkBox.checked = true;
        this.header.appendChild(this.checkBox);
        
        this.headerLabel = document.createElement("div");
        this.headerLabel.className = "headerLabel";
        this.headerLabel.innerText = title;
        this.header.appendChild(this.headerLabel);

        // content //
        this.content = document.createElement("div");
        this.content.className = "content";
        this.content.innerText = content;
        this.appendChild(this.content);
        this.contentContainer = this.content;
    }
    
    get isChecked()
    {
        return this.checkBox.checked;
    }
}
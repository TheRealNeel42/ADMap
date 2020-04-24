export default class Widget
{
    constructor(className_or_container)
    {
        if (className_or_container)
        {
            if (typeof(className_or_container) === "string")
            {
                this.container = document.createElement("div");
                this.container.className = className_or_container;
            }
            else
            {
                this.container = className_or_container;
            }
        }
        else
        {
            this.container = document.createElement("div");
        }

        this.contentContainer = this.container;
    }

    show()
    {
        this.container.style.display = "";
    }

    hide()
    {
        this.container.style.display = "none";
    }

    set innerHTML(innerHTML)
    {
        this.contentContainer.innerHTML = innerHTML;
    }

    get innerHTML()
    {
        return this.contentContainer.innerHTML;
    }

    set innerText(innerText)
    {
        this.contentContainer.innerText = innerText;
    }

    get innerText()
    {
        return this.contentContainer.innerText;
    }

    appendChild(...children)
    {
        if (children.length === 1)
        {
            this.appendHelper(this.contentContainer, children[0]);
        }
        else
        {
            let frag = document.createDocumentFragment();
    
            children.forEach(child =>
            {
                this.appendHelper(frag, child);
            });
    
            this.contentContainer.appendChild(frag);
        }
    }

    appendHelper(parent, child)
    {
        if (child instanceof HTMLElement)
        {
            parent.appendChild(child);
        }
        else if (child)
        {
            parent.appendChild(child.container);
        }
    }

    removeChild(child)
    {
        if (!this.hasChild(child))
        {
            return false;
        }

        if (child instanceof HTMLElement)
        {
            this.contentContainer.removeChild(child);
        }
        else
        {
            this.contentContainer.removeChild(child.container);
        }

        return true;
    }

    hasChild(child)
    {
        if (child instanceof HTMLElement)
        {
            return this.contentContainer.contains(child);
        }
        else
        {
            return this.contentContainer.contains(child.container);
        }
    }
}
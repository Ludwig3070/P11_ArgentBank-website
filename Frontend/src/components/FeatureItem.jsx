function FeatureItem ({src,alt,h3,children}) {

    return(
        <div className="feature-item">
          <img src={src} alt={alt} className="feature-icon" />
          <h3 className="feature-item-title">{h3}</h3>
          <p>
            {children}
          </p>
        </div>
    )

}

export default FeatureItem
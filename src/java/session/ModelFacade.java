/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Model;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author angel
 */
@Stateless
public class ModelFacade extends AbstractFacade<Model> {

    @PersistenceContext(unitName = "SPTV20WebShoeShopMozgovJSPU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public ModelFacade() {
        super(Model.class);
    }
    
}
